/*
  Warnings:

  - You are about to alter the column `basePrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "urlName" TEXT NOT NULL,
    "picture" TEXT,
    "basePrice" INTEGER NOT NULL,
    "discountPercentage" INTEGER NOT NULL DEFAULT 0,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Product" ("basePrice", "createdAt", "description", "discountPercentage", "id", "name", "picture", "stock", "urlName") SELECT "basePrice", "createdAt", "description", "discountPercentage", "id", "name", "picture", "stock", "urlName" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
CREATE UNIQUE INDEX "Product_urlName_key" ON "Product"("urlName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
