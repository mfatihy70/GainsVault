DROP TABLE IF EXISTS "exercise_entries";
DROP SEQUENCE IF EXISTS exercise_entries_id_seq;
CREATE SEQUENCE exercise_entries_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."exercise_entries" (
    "id" integer DEFAULT nextval('exercise_entries_id_seq') NOT NULL,
    "workout_entry_id" integer,
    "workout_exercise_id" integer,
    "exercise_id" integer,
    "performed_at" timestamptz,
    CONSTRAINT "exercise_entries_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "exercises";
DROP SEQUENCE IF EXISTS exercises_id_seq;
CREATE SEQUENCE exercises_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."exercises" (
    "id" integer DEFAULT nextval('exercises_id_seq') NOT NULL,
    "name" character varying(50) NOT NULL,
    "primary" enum_exercises_primary NOT NULL,
    "secondary" enum_exercises_secondary,
    "equipment" enum_exercises_equipment,
    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "exercises" ("id", "name", "primary", "secondary", "equipment") VALUES
(1,	'Barbell Bench Press',	'chest',	'triceps',	'barbell'),
(2,	'Pull-Ups',	'lats',	'biceps',	'bodyweight'),
(3,	'Dumbbell Shoulder Press',	'delts',	'triceps',	'dumbbell'),
(4,	'Barbell Squat',	'quads',	'glutes',	'barbell'),
(5,	'Romanian Deadlift',	'hamstrings',	'glutes',	'barbell'),
(6,	'Cable Lat Pulldown',	'lats',	'biceps',	'cable'),
(7,	'Dumbbell Bicep Curl',	'biceps',	NULL,	'dumbbell'),
(8,	'Triceps Rope Pushdown',	'triceps',	NULL,	'cable'),
(9,	'Leg Press',	'quads',	'glutes',	'machine'),
(10,	'Plank',	'abs',	NULL,	'bodyweight'),
(11,	'Barbell Deadlift',	'lower_back',	'hamstrings',	'barbell'),
(12,	'Dumbbell Lateral Raises',	'delts',	NULL,	'dumbbell'),
(13,	'Cable Chest Fly',	'chest',	NULL,	'cable'),
(14,	'Barbell Bent Over Row',	'lats',	'biceps',	'barbell'),
(15,	'Hanging Leg Raises',	'abs',	NULL,	'bodyweight'),
(16,	'Dumbbell Shrugs',	'traps',	NULL,	'dumbbell'),
(17,	'Calf Raises',	'calves',	NULL,	'machine'),
(18,	'Incline Dumbbell Press',	'chest',	'delts',	'dumbbell'),
(19,	'Hamstring Curl',	'hamstrings',	NULL,	'machine'),
(20,	'Face Pulls',	'delts',	'traps',	'cable');

DROP TABLE IF EXISTS "set_entries";
DROP SEQUENCE IF EXISTS set_entries_id_seq;
CREATE SEQUENCE set_entries_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."set_entries" (
    "id" integer DEFAULT nextval('set_entries_id_seq') NOT NULL,
    "exercise_entry_id" integer,
    "set_order" integer NOT NULL,
    "kg" numeric(5,2) NOT NULL,
    "reps" integer NOT NULL,
    "performed_at" timestamptz,
    CONSTRAINT "set_entries_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "splits";
DROP SEQUENCE IF EXISTS splits_id_seq;
CREATE SEQUENCE splits_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."splits" (
    "id" integer DEFAULT nextval('splits_id_seq') NOT NULL,
    "name" character varying(50) NOT NULL,
    "description" character varying(255),
    "days" integer NOT NULL,
    "difficulty" enum_splits_difficulty NOT NULL,
    CONSTRAINT "splits_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "splits" ("id", "name", "description", "days", "difficulty") VALUES
(1,	'Push-Pull-Legs (PPL)',	'Split focusing on pushing muscles (chest, shoulders, triceps), pulling muscles (back, biceps), and legs on separate days',	3,	'intermediate'),
(3,	'Arnold Split',	'Arnold Schwarzenegger''s famous split focusing on chest/back, shoulders/arms, and legs twice per week',	6,	'advanced'),
(4,	'Upper/Lower',	'Alternates between upper body and lower body workouts throughout the week',	2,	'beginner'),
(5,	'Full Body',	'Works all major muscle groups in each session, typically done 3 times a week',	1,	'beginner'),
(2,	'Bro Split',	'Traditional bodybuilding split training each major muscle group once per week',	5,	'intermediate');

DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "name" character varying(255) NOT NULL,
    "email" character varying(255) NOT NULL,
    "location" character varying(255),
    "bio" text,
    "role" enum_users_role DEFAULT 'user',
    "password" character varying(255) NOT NULL,
    "age" integer,
    "height" double precision,
    "weight" json,
    "avatar" character varying(255),
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "users_email_key" UNIQUE ("email"),
    CONSTRAINT "users_email_key1" UNIQUE ("email"),
    CONSTRAINT "users_email_key10" UNIQUE ("email"),
    CONSTRAINT "users_email_key11" UNIQUE ("email"),
    CONSTRAINT "users_email_key12" UNIQUE ("email"),
    CONSTRAINT "users_email_key13" UNIQUE ("email"),
    CONSTRAINT "users_email_key14" UNIQUE ("email"),
    CONSTRAINT "users_email_key15" UNIQUE ("email"),
    CONSTRAINT "users_email_key16" UNIQUE ("email"),
    CONSTRAINT "users_email_key17" UNIQUE ("email"),
    CONSTRAINT "users_email_key18" UNIQUE ("email"),
    CONSTRAINT "users_email_key19" UNIQUE ("email"),
    CONSTRAINT "users_email_key2" UNIQUE ("email"),
    CONSTRAINT "users_email_key20" UNIQUE ("email"),
    CONSTRAINT "users_email_key21" UNIQUE ("email"),
    CONSTRAINT "users_email_key22" UNIQUE ("email"),
    CONSTRAINT "users_email_key23" UNIQUE ("email"),
    CONSTRAINT "users_email_key24" UNIQUE ("email"),
    CONSTRAINT "users_email_key25" UNIQUE ("email"),
    CONSTRAINT "users_email_key26" UNIQUE ("email"),
    CONSTRAINT "users_email_key27" UNIQUE ("email"),
    CONSTRAINT "users_email_key28" UNIQUE ("email"),
    CONSTRAINT "users_email_key29" UNIQUE ("email"),
    CONSTRAINT "users_email_key3" UNIQUE ("email"),
    CONSTRAINT "users_email_key30" UNIQUE ("email"),
    CONSTRAINT "users_email_key31" UNIQUE ("email"),
    CONSTRAINT "users_email_key32" UNIQUE ("email"),
    CONSTRAINT "users_email_key33" UNIQUE ("email"),
    CONSTRAINT "users_email_key34" UNIQUE ("email"),
    CONSTRAINT "users_email_key35" UNIQUE ("email"),
    CONSTRAINT "users_email_key36" UNIQUE ("email"),
    CONSTRAINT "users_email_key37" UNIQUE ("email"),
    CONSTRAINT "users_email_key38" UNIQUE ("email"),
    CONSTRAINT "users_email_key39" UNIQUE ("email"),
    CONSTRAINT "users_email_key4" UNIQUE ("email"),
    CONSTRAINT "users_email_key40" UNIQUE ("email"),
    CONSTRAINT "users_email_key41" UNIQUE ("email"),
    CONSTRAINT "users_email_key42" UNIQUE ("email"),
    CONSTRAINT "users_email_key43" UNIQUE ("email"),
    CONSTRAINT "users_email_key44" UNIQUE ("email"),
    CONSTRAINT "users_email_key45" UNIQUE ("email"),
    CONSTRAINT "users_email_key46" UNIQUE ("email"),
    CONSTRAINT "users_email_key47" UNIQUE ("email"),
    CONSTRAINT "users_email_key48" UNIQUE ("email"),
    CONSTRAINT "users_email_key49" UNIQUE ("email"),
    CONSTRAINT "users_email_key5" UNIQUE ("email"),
    CONSTRAINT "users_email_key50" UNIQUE ("email"),
    CONSTRAINT "users_email_key51" UNIQUE ("email"),
    CONSTRAINT "users_email_key52" UNIQUE ("email"),
    CONSTRAINT "users_email_key53" UNIQUE ("email"),
    CONSTRAINT "users_email_key54" UNIQUE ("email"),
    CONSTRAINT "users_email_key55" UNIQUE ("email"),
    CONSTRAINT "users_email_key56" UNIQUE ("email"),
    CONSTRAINT "users_email_key57" UNIQUE ("email"),
    CONSTRAINT "users_email_key58" UNIQUE ("email"),
    CONSTRAINT "users_email_key59" UNIQUE ("email"),
    CONSTRAINT "users_email_key6" UNIQUE ("email"),
    CONSTRAINT "users_email_key60" UNIQUE ("email"),
    CONSTRAINT "users_email_key61" UNIQUE ("email"),
    CONSTRAINT "users_email_key62" UNIQUE ("email"),
    CONSTRAINT "users_email_key63" UNIQUE ("email"),
    CONSTRAINT "users_email_key64" UNIQUE ("email"),
    CONSTRAINT "users_email_key7" UNIQUE ("email"),
    CONSTRAINT "users_email_key8" UNIQUE ("email"),
    CONSTRAINT "users_email_key9" UNIQUE ("email"),
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "users" ("id", "name", "email", "location", "bio", "role", "password", "age", "height", "weight", "avatar", "createdAt", "updatedAt") VALUES
(1,	'admin',	'admin@admin',	'admin',	'admin',	'user',	'$2a$10$1pF4W8Zv3nX6y/6Q.u8bfuHT/5JB6HvBW51GvPDSyMQcDdJxs1kOq',	NULL,	320,	'[{"value":"23","date":"2025-05-12T20:39:28.973Z"},{"value":"100","date":"2025-05-12T20:46:36.480Z"},{"value":"600","date":"2025-05-12T20:50:21.637Z"},{"value":"100","date":"2025-05-12T21:09:06.518Z"},{"value":"100","date":"2025-05-12T21:26:10.482Z"},{"value":"878","date":"2025-05-12T21:26:20.300Z"},{"value":"213","date":"2025-05-12T21:35:32.636Z"},{"value":"12","date":"2025-05-12T21:57:55.646Z"},{"value":"112","date":"2025-05-12T22:00:02.075Z"},{"value":"2","date":"2025-05-12T22:10:39.112Z"},{"value":"23","date":"2025-05-12T22:20:15.306Z"},{"value":"233","date":"2025-05-12T22:21:13.394Z"},{"value":"23","date":"2025-05-13T06:14:05.319Z"},{"value":"99","date":"2025-05-13T06:34:47.432Z"},{"value":"77","date":"2025-05-13T06:35:52.615Z"},{"value":"12","date":"2025-05-13T06:59:53.675Z"},{"value":"44","date":"2025-05-13T07:05:24.724Z"}]',	NULL,	'2025-05-12 17:33:59.237+00',	'2025-05-13 07:09:10.705+00'),
(2,	'Fatih',	'fatih@com',	'Wien',	'Hi',	'user',	'$2a$10$17hkswIrYjE3OeJDaLsxHOVxGnMJO5npVicACDvEiQcR2gbvpRQH6',	NULL,	NULL,	'[{"value":"2300","date":"2025-05-12T20:39:28.973Z"},{"value":"100","date":"2025-05-12T20:46:36.480Z"},{"value":"600","date":"2025-05-12T20:50:21.637Z"},{"value":"100","date":"2025-05-12T21:09:06.518Z"},{"value":"100","date":"2025-05-12T21:26:10.482Z"},{"value":"878","date":"2025-05-12T21:26:20.300Z"},{"value":"213","date":"2025-05-12T21:35:32.636Z"},{"value":"12","date":"2025-05-12T21:57:55.646Z"},{"value":"112","date":"2025-05-12T22:00:02.075Z"},{"value":"2","date":"2025-05-12T22:10:39.112Z"},{"value":"23","date":"2025-05-12T22:20:15.306Z"},{"value":"233","date":"2025-05-12T22:21:13.394Z"},{"value":"23","date":"2025-05-13T06:14:05.319Z"},{"value":"99","date":"2025-05-13T06:34:47.432Z"},{"value":"77","date":"2025-05-13T06:35:52.615Z"},{"value":"12","date":"2025-05-13T06:59:53.675Z"},{"value":"44","date":"2025-05-13T07:05:24.724Z"}]',	NULL,	'2025-05-13 10:10:45.56+00',	'2025-05-13 10:25:47.478+00');

DROP TABLE IF EXISTS "workout_entries";
DROP SEQUENCE IF EXISTS workout_entries_id_seq;
CREATE SEQUENCE workout_entries_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."workout_entries" (
    "id" integer DEFAULT nextval('workout_entries_id_seq') NOT NULL,
    "user_id" integer,
    "workout_id" integer,
    "name" character varying(50),
    "performed_at" timestamptz,
    CONSTRAINT "workout_entries_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "workout_exercises";
DROP SEQUENCE IF EXISTS workout_exercises_id_seq;
CREATE SEQUENCE workout_exercises_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."workout_exercises" (
    "id" integer DEFAULT nextval('workout_exercises_id_seq') NOT NULL,
    "workout_id" integer,
    "exercise_id" integer,
    "order" integer NOT NULL,
    CONSTRAINT "workout_exercises_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "workouts";
DROP SEQUENCE IF EXISTS workouts_id_seq;
CREATE SEQUENCE workouts_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."workouts" (
    "id" integer DEFAULT nextval('workouts_id_seq') NOT NULL,
    "split_id" integer,
    "name" character varying(50) NOT NULL,
    "order" integer NOT NULL,
    CONSTRAINT "workouts_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "workouts" ("id", "split_id", "name", "order") VALUES
(1,	1,	'Push Day',	1),
(2,	1,	'Pull Day',	2),
(3,	1,	'Legs Day',	3),
(4,	2,	'Chest & Triceps',	1),
(5,	2,	'Back & Biceps',	2),
(6,	2,	'Legs & Abs',	3),
(7,	2,	'Shoulders & Arms',	4);

ALTER TABLE ONLY "public"."exercise_entries" ADD CONSTRAINT "exercise_entries_exercise_id_fkey" FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."exercise_entries" ADD CONSTRAINT "exercise_entries_workout_entry_id_fkey" FOREIGN KEY (workout_entry_id) REFERENCES workout_entries(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."exercise_entries" ADD CONSTRAINT "exercise_entries_workout_exercise_id_fkey" FOREIGN KEY (workout_exercise_id) REFERENCES workout_exercises(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."set_entries" ADD CONSTRAINT "set_entries_exercise_entry_id_fkey" FOREIGN KEY (exercise_entry_id) REFERENCES exercise_entries(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."workout_entries" ADD CONSTRAINT "workout_entries_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."workout_entries" ADD CONSTRAINT "workout_entries_workout_id_fkey" FOREIGN KEY (workout_id) REFERENCES workouts(id) ON UPDATE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."workout_exercises" ADD CONSTRAINT "workout_exercises_exercise_id_fkey" FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."workout_exercises" ADD CONSTRAINT "workout_exercises_workout_id_fkey" FOREIGN KEY (workout_id) REFERENCES workouts(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."workouts" ADD CONSTRAINT "workouts_split_id_fkey" FOREIGN KEY (split_id) REFERENCES splits(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

-- 2025-05-13 15:21:08.269014+00
