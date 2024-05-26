<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Options\CategoryOptions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{

    public function index()
    {
        //TODO: Add pagination
        $articles = Article::all();
        $categories = CategoryOptions::all();

        return response()->json([
            'articles' => $articles,
            'categories' => $categories,
        ]);
    }

    public function user()
    {
        $user = Auth::user();
        $articles = Article::where('user_id', $user->id)->get();
        $categories = CategoryOptions::all();

        return response()->json([
            'articles' => $articles,
            'categories' => $categories,
        ]);
    }

    public function category()
    {
        return response()->json([
            'categories' => CategoryOptions::all(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'id' => ['nullable', 'string'],
            'title'    => ['required', 'string', 'min:1', 'max:20'],
            'content'  => ['required', 'string'],
            'category' => ['required', 'string', 'min:1', 'max:255'],
        ]);

        if (!CategoryOptions::inArray($data['category'])) {
            return response()->json([
                'message' => 'Invalid category',
            ], 400);
        }

        if($data['id']){
            $article = Article::find($data['id']);
            if(!$article){
                return response()->json([
                    'message' => 'Article not found',
                ], 404);
            }
            if($article->user_id !== Auth::id()){
                return response()->json([
                    'message' => 'You are not the owner of this article',
                ], 403);
            }
            $article->update([
                'title' => $data['title'],
                'content' => $data['content'],
                'category' => $data['category'] ?? null,
            ]);
            return response()->json([
                'message' => 'Article updated successfully',
            ], 200);
        }

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

        $categories = CategoryOptions::all();

        $is_owner = $article->user_id === Auth::id();

        return response()->json([
            'article' => $article,
            'is_owner' => $is_owner,
            'categories' => $categories,
        ]);
    }
}
