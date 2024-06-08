<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Like;
use App\Options\CategoryOptions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{

    public function anonymousIndex(Request $request)
    {
        error_log('anonymousIndex');
        $data = $request->validate([
            'filterOption' => ['required', 'string'],
            'category' => ['required', 'string', 'min:1', 'max:255'],
        ]);

        $articles = [];
        switch ($data['filterOption']) {
            case 'all':
                if ($data['category'] === 'all')
                    $articles = Article::all();
                else
                    $articles = Article::where('category', $data['category'])->get();
                break;
            default:
                return response()->json([
                    'message' => 'Invalid topBarOption',
                ], 400);
        }
        $categories = CategoryOptions::all();

        return response()->json([
            'articles' => $articles,
            'categories' => $categories,
        ]);
    }


    public function index(Request $request)
    {
        $data = $request->validate([
            'filterOption' => ['required', 'string'],
            'category' => ['required', 'string', 'min:1', 'max:255'],
        ]);

        //TODO: Add pagination
        $articles = [];
        switch ( $data['filterOption'] ) {
            case 'all':
                if ($data['category'] === 'all')
                    $articles = Article::all();
                else
                    $articles = Article::where('category', $data['category'])->get();
                break;
            case 'favorite':
                //TODO: Implement favorite
                if ($data['category'] === 'all')
                    $articles = Auth::user()->likedArticles;
                else
                    $articles = Auth::user()->likedArticles()->where('category', $data['category'])->get();
                break;
            case 'my':
                if ($data['category'] === 'all')
                    $articles = Article::all();
                else
                    $articles = Article::where('category', $data['category'])->where('user_id', Auth::id())->get();
                break;
        }

        // determine if the user likes the article
        foreach ($articles as $article) {
            $article->is_liked = $article->likeByUser(Auth::id());
        }

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

    public function like(Request $request)
    {
        $data = $request->validate([
            'article_id' => ['required', 'string'],
            'like' => ['required', 'boolean'],
        ]);

        $article = Article::find($data['article_id']);
        if (!$article) {
            return response()->json([
                'message' => 'Article not found',
            ], 404);
        }

        $like = Like::where('article_id', $article->id)->where('user_id', Auth::id())->first();
        if ($like) {
            $like->update([
                'like' => $data['like'],
            ]);
        } else {
            Like::create([
                'article_id' => $article->id,
                'user_id' => Auth::id(),
                'like' => $data['like'],
            ]);
        }

        return response()->json([
            'message' => 'Like updated successfully',
        ]);
    }
}
