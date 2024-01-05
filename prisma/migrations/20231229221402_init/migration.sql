/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "joinDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastVisitDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isCoach" BOOLEAN NOT NULL DEFAULT false,
    "isWebmaster" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "isSubscriber" BOOLEAN NOT NULL DEFAULT false,
    "avatarPath" TEXT NOT NULL DEFAULT 'public/defaultAvatar.svg',
    "aboutMe" TEXT NOT NULL DEFAULT '',
    "profileVisibility" TEXT NOT NULL DEFAULT 'public'
);
INSERT INTO "new_User" ("aboutMe", "avatarPath", "email", "firstName", "id", "isAdmin", "isBanned", "isCoach", "isSubscriber", "isVerified", "isWebmaster", "joinDate", "lastName", "lastVisitDate", "profileVisibility", "username") SELECT "aboutMe", "avatarPath", "email", "firstName", "id", "isAdmin", "isBanned", "isCoach", "isSubscriber", "isVerified", "isWebmaster", "joinDate", "lastName", "lastVisitDate", "profileVisibility", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
