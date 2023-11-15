-- CreateTable
CREATE TABLE "prompt_subjects" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID,
    "name" TEXT,
    "description" TEXT,

    CONSTRAINT "promptSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompts" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "subject_id" BIGINT,
    "label" TEXT,
    "content" TEXT,
    "meta" JSONB,
    "user_id" UUID,

    CONSTRAINT "prompts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "samples" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "prompt_subject_id" BIGINT,
    "user_id" UUID,

    CONSTRAINT "samples_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "prompt_subjects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "samples" ADD CONSTRAINT "samples_prompt_subject_id_fkey" FOREIGN KEY ("prompt_subject_id") REFERENCES "prompt_subjects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

