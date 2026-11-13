-- CreateTable
CREATE TABLE "public"."DemoRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "school" TEXT,
    "role" TEXT,
    "message" TEXT,
    "source" TEXT,
    "notified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DemoRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DemoRequest_createdAt_idx" ON "public"."DemoRequest"("createdAt");

