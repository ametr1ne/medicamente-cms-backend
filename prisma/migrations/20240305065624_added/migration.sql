-- AlterTable
ALTER TABLE "Expert" ALTER COLUMN "photo" DROP NOT NULL,
ALTER COLUMN "photo" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "bannerImage" TEXT,
ADD COLUMN     "bannerText" TEXT,
ALTER COLUMN "icon" DROP NOT NULL,
ALTER COLUMN "icon" DROP DEFAULT;
