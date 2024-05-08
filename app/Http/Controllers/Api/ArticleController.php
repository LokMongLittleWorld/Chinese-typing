<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'title'    => ['required', 'string', 'min:3', 'max:255'],
            'content'  => ['required', 'string'],
            'category' => ['nullable', 'string', 'min:3', 'max:255'],
            'details'  => ['nullable', 'string'],
        ]);

        Article::create([
            'ulid' =>Str::ulid()->toBase32(),
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
}
