<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use App\Models\Author;
use App\Services\AuthorService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ConfigurationController extends Controller
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
        return Inertia::render('Admin/Configuration/Index');
    }

    /**
     * @param StoreAuthorRequest $request
     *
     * @return RedirectResponse
     */
    public function store(StoreAuthorRequest $request): RedirectResponse
    {
        $this->authorService->createAuthor($request->validated());

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
