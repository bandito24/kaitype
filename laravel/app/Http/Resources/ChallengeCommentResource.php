<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChallengeCommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $array = parent::toArray($request);

        // Add or modify fields
        $array['created_at'] = $this->created_at->diffForHumans();
        $array['edited'] = $array['edited'] === 1;
        $array['has_response'] = $array['has_response'] === 1;
        return $array;
    }
}
