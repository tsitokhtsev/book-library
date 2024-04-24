<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateBookCopyRequest;
use App\Models\BookCopy;
use App\Models\Branch;
use App\Models\Condition;
use App\Models\Status;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BookCopyController extends Controller
{
    public function update(UpdateBookCopyRequest $request) {
        $validated = $request->validated();

        try {
            BookCopy::where('code', $request->route()->parameter('code'))
                ->update([
                    'code' => $validated['code'],
                    'branch_id' => Branch::where('name', $validated['branch']['name'])->first()->id,
                    'condition_id' => Condition::where('name', $validated['condition']['name'])->first()->id,
                    'status_id' => Status::where('name', $validated['status']['name'])->first()->id
                ]);
            return redirect()->back()->with('success', 'Updated Successfully');
        } catch (Exception $e) {
            Log::error($e);
            return redirect()->back()->with('error', 'Failed to update the book. Please try again.');
        }
    }

    public function destroy(Request $request) {
        try {
            BookCopy::where('code', $request->route()->parameter('code'))->delete();
            return redirect()->back()->with('success', 'Deleted Successfully');
        } catch (Exception $e) {
            Log::error($e);
            return redirect()->back()->with('error', 'Failed to delete the book. Please try again.');
        }
    }
}
