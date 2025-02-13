<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Add composite index for search performance
            $table->index(['name', 'email'], 'users_search_idx');
            // Add index for role_id since we're joining on it
            $table->index('role_id', 'users_role_id_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex('users_search_idx');
            $table->dropIndex('users_role_id_idx');
        });
    }
};
