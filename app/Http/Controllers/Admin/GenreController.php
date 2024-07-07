<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGenreRequest;
use App\Http\Requests\UpdateGenreRequest;
use App\Models\Genre;
use App\Services\GenreService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class GenreController extends Controller
{
    /**
     * @param GenreService $genreService
     */
    public function __construct(
        public GenreService $genreService
    ) {}

    /**
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Genres/Index', [
            'genres' => Genre::select('id', 'name')
                ->withCount('books')
                ->get(),
        ]);
    }

    /**
     * @param StoreGenreRequest $request
     *
     * @return RedirectResponse
     */
    public function store(StoreGenreRequest $request): RedirectResponse
    {
        $this->genreService->createGenre($request->validated());

        return redirect()
            ->route('admin.genres')
            ->with('success', __('Genre created successfully!'));
    }

    /**
     * @param UpdateGenreRequest $request
     * @param Genre $genre
     *
     * @return RedirectResponse
     * @throws Exception
     */
    public function update(UpdateGenreRequest $request, Genre $genre): RedirectResponse
    {
        $this->genreService->updateGenre($request->validated(), $genre->id);

        return redirect()
            ->route('admin.genres')
            ->with('success', __('Genre updated successfully!'));
    }

    /**
     * @param Genre $genre
     *
     * @return RedirectResponse
     */
    public function destroy(Genre $genre): RedirectResponse
    {
        $genre->delete();

        return redirect()
            ->route('admin.genres')
            ->with('success', __('Genre deleted successfully!'));
    }
}
