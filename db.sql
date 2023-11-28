CREATE EXTENSION citext;
CREATE DOMAIN email AS citext
    CHECK ( value ~
            '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' );

CREATE OR REPLACE FUNCTION "public"."set_updated_at"()
    RETURNS TRIGGER AS
$$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        NEW."updatedAt" = CURRENT_TIMESTAMP;
    END IF;
    RETURN NEW;
END;
$$
    LANGUAGE plpgsql;


-- CreateTable
CREATE TABLE "User"
(
    "id"            uuid         NOT NULL DEFAULT gen_random_uuid(),
    "name"          TEXT,
    "email"         email        NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id"),
    UNIQUE ("email")
);

CREATE TRIGGER update_user_updated_at
    BEFORE update
    ON public."User"
    FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- CreateTable
CREATE TABLE "Candidates"
(
    "id"             uuid         NOT NULL DEFAULT gen_random_uuid(),
    "name"           TEXT,
    "email"          email        NOT NULL,
    "specialization" TEXT,
    "status"         TEXT,
    "createdAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id"),
    UNIQUE ("email")
);

CREATE TRIGGER update_candidates_updated_at
    BEFORE update
    ON public."Candidates"
    FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- CreateTable
CREATE TABLE "Jobs"
(
    "id"            uuid         NOT NULL DEFAULT gen_random_uuid(),
    "title"         TEXT,
    "description"   TEXT,
    "openPositions" INTEGER      NOT NULL DEFAULT 0,
    "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer"
(
    "id"          uuid         NOT NULL DEFAULT gen_random_uuid(),
    "jobId"       uuid,
    "candidateId" uuid,
    "userId"      uuid,
    "status"      TEXT,
    "description" TEXT,
    "pin"         INTEGER      NOT NULL DEFAULT floor(random() * (9999 - 1000 + 1) + 1000),
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id"),
    FOREIGN KEY ("jobId") REFERENCES "Jobs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("candidateId") REFERENCES "Candidates" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE ("jobId", "candidateId")
);

CREATE TRIGGER update_offer_updated_at
    BEFORE update
    ON public."Offer"
    FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE VIEW "CandidateOffersView" AS
SELECT "Candidates"."id"             AS "candidateId",
       "Candidates"."name"           AS "candidateName",
       "Candidates"."email"          AS "candidateEmail",
       "Candidates"."specialization" AS "candidateSpecialization",
       "Candidates"."status"         AS "candidateStatus",
       "Jobs"."id"                   AS "jobId",
       "Jobs"."title"                AS "jobTitle",
       "Jobs"."description"          AS "jobDescription",
       "Jobs"."openPositions"        AS "jobOpenPositions",
       "Offer"."id"                  AS "offerId",
       "Offer"."status"              AS "offerStatus",
       "Offer"."description"         AS "offerDescription",
       "Offer"."createdAt"           AS "offerCreatedAt",
       "Offer"."pin"                 AS "offerPin",
       "User"."id"                   AS "userId",
       "User"."name"                 AS "userName",
       "User"."email"                AS "userEmail"
FROM "Candidates"
         LEFT JOIN "Offer" ON "Offer"."candidateId" = "Candidates"."id"
         LEFT JOIN "Jobs" ON "Offer"."jobId" = "Jobs"."id"
         Left JOIN "User" ON "Offer"."userId" = "User"."id";


--Seed
INSERT INTO public."User" (name, email)
VALUES ('John Doe', 'user@user.com');
