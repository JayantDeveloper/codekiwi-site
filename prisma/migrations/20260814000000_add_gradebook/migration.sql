-- CreateTable
CREATE TABLE "public"."SessionStudent" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL DEFAULT 0,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SessionAnswer" (
    "id" TEXT NOT NULL,
    "sessionStudentId" TEXT NOT NULL,
    "slideIndex" INTEGER NOT NULL,
    "code" TEXT NOT NULL DEFAULT '',
    "output" TEXT NOT NULL DEFAULT '',
    "passed" BOOLEAN,
    "ranAt" TIMESTAMP(3),

    CONSTRAINT "SessionAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SessionStudent_sessionId_idx" ON "public"."SessionStudent"("sessionId");

-- CreateIndex
CREATE INDEX "SessionAnswer_sessionStudentId_idx" ON "public"."SessionAnswer"("sessionStudentId");

-- AddForeignKey
ALTER TABLE "public"."SessionStudent" ADD CONSTRAINT "SessionStudent_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SessionAnswer" ADD CONSTRAINT "SessionAnswer_sessionStudentId_fkey" FOREIGN KEY ("sessionStudentId") REFERENCES "public"."SessionStudent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
