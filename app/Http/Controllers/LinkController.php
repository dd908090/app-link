<?php

namespace App\Http\Controllers;

use App\Http\Requests\Link\StoreRequest;
use App\Models\Link;
use Illuminate\Support\Facades\DB;

class LinkController extends Controller
{
    public function show()
    {
        return inertia("Link/Show");
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();
        $customLink = $data["custom_link"] ?? null;

        $newId = (DB::table('links')->latest('id')->value('id') ?? 0) + 1;
        $shortLink = $customLink ? $customLink : $newId . str()->random(4);

        if (Link::query()->where('short_link', $shortLink)->exists()) {
            return inertia("Link/Show", ["message" => "Link already exists. Try another one.",]);
        }

        Link::create(['short_link' => $shortLink, 'long_link' => $data['long_link'],]);
        return inertia("Link/Show", ["message" => "Link has been created.", "short_link" => $shortLink,]);
    }

    public function handleRedirect($short_link)
    {

        $link = Link::query()->where('short_link', $short_link)->first();

        return $link ? redirect($link->long_link) : abort(404, message: "Link not found.");

    }
}
