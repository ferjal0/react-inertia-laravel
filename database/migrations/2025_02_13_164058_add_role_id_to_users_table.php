<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\RoleType;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First get the user role id
        $userRoleId = DB::table('roles')
            ->where('name', RoleType::USER->value)
            ->value('id');

        Schema::table('users', function (Blueprint $table) use ($userRoleId) {
            $table->foreignId('role_id')
                ->after('id')
                ->default($userRoleId)
                ->constrained()
                ->onDelete('restrict');
        });

        // Remove the default constraint
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')
                ->default(null)
                ->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropColumn('role_id');
        });
    }
};
