/*
  Warnings:

  - The values [TEACHER,STUDENT] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `major` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `school_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `assignments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `attendances` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `characters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `classroom_announces` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `classroom_assignments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `classroom_games` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `classroom_tutors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `classroom_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `classrooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `game_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `game_sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `homework_submissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schools` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tutor_sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_items` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'USER');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "assignments" DROP CONSTRAINT "assignments_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_active_game_id_fkey";

-- DropForeignKey
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_active_tutor_id_fkey";

-- DropForeignKey
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_homework_submission_id_fkey";

-- DropForeignKey
ALTER TABLE "attendances" DROP CONSTRAINT "attendances_user_id_fkey";

-- DropForeignKey
ALTER TABLE "characters" DROP CONSTRAINT "characters_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "classroom_announces" DROP CONSTRAINT "classroom_announces_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "classroom_announces" DROP CONSTRAINT "classroom_announces_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "classroom_assignments" DROP CONSTRAINT "classroom_assignments_assignment_id_fkey";

-- DropForeignKey
ALTER TABLE "classroom_assignments" DROP CONSTRAINT "classroom_assignments_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "classroom_games" DROP CONSTRAINT "classroom_games_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "classroom_games" DROP CONSTRAINT "classroom_games_game_id_fkey";

-- DropForeignKey
ALTER TABLE "classroom_tutors" DROP CONSTRAINT "classroom_tutors_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "classroom_tutors" DROP CONSTRAINT "classroom_tutors_tutor_id_fkey";

-- DropForeignKey
ALTER TABLE "classroom_users" DROP CONSTRAINT "classroom_users_classroomId_fkey";

-- DropForeignKey
ALTER TABLE "classroom_users" DROP CONSTRAINT "classroom_users_userId_fkey";

-- DropForeignKey
ALTER TABLE "classrooms" DROP CONSTRAINT "classrooms_school_id_fkey";

-- DropForeignKey
ALTER TABLE "game_items" DROP CONSTRAINT "game_items_game_id_fkey";

-- DropForeignKey
ALTER TABLE "game_items" DROP CONSTRAINT "game_items_item_id_fkey";

-- DropForeignKey
ALTER TABLE "game_sessions" DROP CONSTRAINT "game_sessions_character_id_fkey";

-- DropForeignKey
ALTER TABLE "game_sessions" DROP CONSTRAINT "game_sessions_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "homework_submissions" DROP CONSTRAINT "homework_submissions_assignment_id_fkey";

-- DropForeignKey
ALTER TABLE "homework_submissions" DROP CONSTRAINT "homework_submissions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tutor_sessions" DROP CONSTRAINT "tutor_sessions_host_id_fkey";

-- DropForeignKey
ALTER TABLE "user_items" DROP CONSTRAINT "user_items_item_id_fkey";

-- DropForeignKey
ALTER TABLE "user_items" DROP CONSTRAINT "user_items_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_school_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "major",
DROP COLUMN "points",
DROP COLUMN "school_id",
DROP COLUMN "student_id",
DROP COLUMN "teacher_id",
ALTER COLUMN "role" SET DEFAULT 'USER';

-- DropTable
DROP TABLE "assignments";

-- DropTable
DROP TABLE "attendances";

-- DropTable
DROP TABLE "characters";

-- DropTable
DROP TABLE "classroom_announces";

-- DropTable
DROP TABLE "classroom_assignments";

-- DropTable
DROP TABLE "classroom_games";

-- DropTable
DROP TABLE "classroom_tutors";

-- DropTable
DROP TABLE "classroom_users";

-- DropTable
DROP TABLE "classrooms";

-- DropTable
DROP TABLE "game_items";

-- DropTable
DROP TABLE "game_sessions";

-- DropTable
DROP TABLE "homework_submissions";

-- DropTable
DROP TABLE "items";

-- DropTable
DROP TABLE "schools";

-- DropTable
DROP TABLE "tutor_sessions";

-- DropTable
DROP TABLE "user_items";

-- DropEnum
DROP TYPE "AssignmentStatus";

-- DropEnum
DROP TYPE "CheckStatus";

-- DropEnum
DROP TYPE "ItemType";
