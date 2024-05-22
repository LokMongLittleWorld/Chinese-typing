<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{

    public function index()
    {
        //TODO: Add pagination
        $articles = Article::all();

        return response()->json([
            'articles' => $articles,
        ]);
    }

    public function user()
    {
        $user = Auth::user();
        $articles = Article::where('user_id', $user->id)->get();

        return response()->json([
            'articles' => $articles,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'    => ['required', 'string', 'min:3', 'max:255'],
            'content'  => ['required', 'string'],
            'category' => ['nullable', 'string', 'min:3', 'max:255'],
            'details'  => ['nullable', 'string'],
        ]);

        Article::create([
            'title' => $data['title'],
            'user_id' => Auth::id(),
            'content' => $data['content'],
            'category' => $data['category'] ?? null,
            'details' => $data['details'] ?? null,
        ]);

        return response()->json([
            'message' => 'Article created successfully',
        ], 201);
    }

    public function show($article_id)
    {
        $article = Article::find($article_id);

        if (!$article) {
            return response()->json([
                'message' => 'Article not found',
            ], 404);
        }

        return response()->json([
            'article' => $article,
        ]);
    }
}
