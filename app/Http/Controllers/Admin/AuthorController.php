<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use App\Models\Author;
use App\Services\AuthorService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuthorController extends Controller
{
    /**
     * @param AuthorService $authorService
     */
    public function __construct(
        public AuthorService $authorService
    ) {}

    /**
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Authors/Index', [
            'authors' => Author::select('id', 'name', 'bio')
                ->withCount('books')
                ->orderBy('created_at', 'desc')
                ->get(),
        ]);
    }

    public function show(Author $author) {
        $author->load(['books', 'books.language']);

        return Inertia::render('Admin/Authors/Show', [
            'author' => $author,
            'books' => $author->books,
        ]);
    }

    /**
     * @param StoreAuthorRequest $request
     *
     * @return RedirectResponse
     */
    public function store(StoreAuthorRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();

        if ($request->hasFile('cover_image')) {
            $validatedData['cover_image'] = $request->file('cover_image');
        }

        $this->authorService->createAuthor($validatedData);

        return redirect()
            ->route('admin.authors.index')
            ->with('success', __('Author created successfully!'));
    }

    /**
     * @param UpdateAuthorRequest $request
     * @param Author $author
     *
     * @return RedirectResponse
     */
    public function update(UpdateAuthorRequest $request, Author $author): RedirectResponse
    {
        $this->authorService->updateAuthor($request->validated(), $author->id);

        return redirect()
            ->route('admin.authors.index')
            ->with('success', __('Author updated successfully!'));
    }

    /**
     * @param Author $author
     *
     * @return RedirectResponse
     */
    public function destroy(Author $author): RedirectResponse
    {
        $author->delete();

        return redirect()
            ->route('admin.authors.index')
            ->with('success', __('Author deleted successfully!'));
    }
}
