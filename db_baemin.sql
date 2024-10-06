-- -------------------------------------------------------------
-- TablePlus 6.1.6(570)
--
-- https://tableplus.com/
--
-- Database: db_baemin
-- Generation Time: 2024-10-06 20:53:37.9340
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS category_id_seq;

-- Table Definition
CREATE TABLE "public"."category" (
    "id" int4 NOT NULL DEFAULT nextval('category_id_seq'::regclass),
    "name" text NOT NULL,
    "is_remove" bool DEFAULT false,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Customer_id_seq";

-- Table Definition
CREATE TABLE "public"."Customer" (
    "id" int4 NOT NULL DEFAULT nextval('"Customer_id_seq"'::regclass),
    "email" text NOT NULL,
    "age" int4 NOT NULL,
    "password" text NOT NULL,
    "address" text,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Driver_id_seq";

-- Table Definition
CREATE TABLE "public"."Driver" (
    "id" int4 NOT NULL DEFAULT nextval('"Driver_id_seq"'::regclass),
    "email" text NOT NULL,
    "age" int4 NOT NULL,
    "password" text NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "DriverPayments_id_seq";

-- Table Definition
CREATE TABLE "public"."DriverPayments" (
    "id" int4 NOT NULL DEFAULT nextval('"DriverPayments_id_seq"'::regclass),
    "driverId" int4 NOT NULL,
    "orderId" int4 NOT NULL,
    "paymentAmount" float8 NOT NULL,
    "paymentDate" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Food_id_seq";

-- Table Definition
CREATE TABLE "public"."Food" (
    "id" int4 NOT NULL DEFAULT nextval('"Food_id_seq"'::regclass),
    "description" text NOT NULL,
    "cost" float8 NOT NULL,
    "storeId" int4 NOT NULL,
    "category_id" int4,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Order_id_seq";

-- Table Definition
CREATE TABLE "public"."Order" (
    "id" int4 NOT NULL DEFAULT nextval('"Order_id_seq"'::regclass),
    "store_id" int4,
    "customer_id" int4,
    "driver_id" int4,
    "total" float8 NOT NULL,
    "status" varchar(50),
    "orderdate" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliverydate" timestamp,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."OrderFoods" (
    "orderId" int4 NOT NULL,
    "foodId" int4 NOT NULL,
    "quantity" int4 NOT NULL,
    PRIMARY KEY ("orderId","foodId")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."OrderPromotions" (
    "orderId" int4 NOT NULL,
    "promotionId" int4 NOT NULL,
    PRIMARY KEY ("orderId","promotionId")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Promotion_id_seq";

-- Table Definition
CREATE TABLE "public"."Promotion" (
    "id" int4 NOT NULL DEFAULT nextval('"Promotion_id_seq"'::regclass),
    "description" text NOT NULL,
    "value" int4 NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Store_id_seq";

-- Table Definition
CREATE TABLE "public"."Store" (
    "id" int4 NOT NULL DEFAULT nextval('"Store_id_seq"'::regclass),
    "email" text NOT NULL,
    "address" text NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."category" ("id", "name", "is_remove") VALUES
(1, 'Beverages', 'f'),
(2, 'Appetizers', 'f'),
(3, 'Main Course', 'f'),
(4, 'Desserts', 'f'),
(5, 'Salads', 'f');

INSERT INTO "public"."Customer" ("id", "email", "age", "password", "address") VALUES
(1, 'dtrinh', 18, '$2b$05$qfmLHRcCBHL20C/wfrmL2u3ZZX/.RGOzZB4JycZbOFpLn8.MyAwCa', '123'),
(2, 'dtest123', 19, '$2b$05$N/A.7RWn3v7hQEYUb/2g9u1Oog/GtCSIfyYfyB9u7zFhH2..AGBzG', '123 abc'),
(3, 'dtest234', 19, '$2b$05$VNQWvSnp.ViKEUncuYd0dO4EoDsTCL2L5orfQKOH4qqzoZCNBJl9.', '123 abc'),
(4, 'dtest456', 19, '$2b$05$bAi6vWmOl6Qwqi3xiWlQeORpabNsZdwPs1.9XuJEV8d/q5XitafTi', '123 abc'),
(5, 'admin123', 69, '$2b$05$FMhma9rcAfKTiwxAzHM4Uu1iIX4K7KESqBvEUYeOke6EzLkzR/w1C', '123abc');

INSERT INTO "public"."Driver" ("id", "email", "age", "password") VALUES
(1, 'driver1@example.com', 28, 'password123'),
(2, 'driver2@example.com', 34, 'securePass456'),
(3, 'driver3@example.com', 41, 'myPassword789'),
(4, 'driver4@example.com', 26, 'pass2021driver'),
(5, 'driver5@example.com', 30, 'driverPass001'),
(6, 'driver6@example.com', 45, 'safeDriver777'),
(7, 'driver7@example.com', 38, 'secureDriver999'),
(8, 'driver8@example.com', 29, 'driverPass555'),
(9, 'driver9@example.com', 32, 'passwordStrong888'),
(10, 'driver10@example.com', 27, 'driverSecret001');

INSERT INTO "public"."Food" ("id", "description", "cost", "storeId", "category_id") VALUES
(1, 'Pho Bo - Traditional Vietnamese beef noodle soup', 50000, 1, 3),
(2, 'Banh Mi Thit - Vietnamese sandwich with pork', 25000, 1, 3),
(3, 'Ca Phe Sua Da - Iced coffee with condensed milk', 30000, 2, 1),
(4, 'Bun Cha - Grilled pork with rice vermicelli', 60000, 3, 3),
(5, 'Goi Cuon - Fresh spring rolls with shrimp and herbs', 40000, 3, 2),
(6, 'Banh Xeo - Vietnamese crispy pancake with pork and shrimp', 55000, 4, 3),
(7, 'Com Tam - Broken rice with grilled pork', 50000, 4, 3),
(8, 'Hu Tieu - Southern Vietnamese noodle soup with pork and shrimp', 45000, 5, 3),
(9, 'Che Ba Mau - Three-color dessert with beans and jelly', 20000, 6, 4),
(10, 'Ca Phe Den Da - Vietnamese black iced coffee', 25000, 6, 1),
(11, 'Mi Quang - Quang-style noodles with shrimp and pork', 55000, 7, 3),
(12, 'Cha Gio - Fried spring rolls', 35000, 8, 2),
(13, 'Lau Thai - Spicy Thai hot pot', 80000, 9, 3),
(14, 'Nuoc Mia - Sugarcane juice', 15000, 10, 1),
(15, 'Banh Cuon - Steamed rice rolls with pork and mushrooms', 40000, 10, 3);

INSERT INTO "public"."Order" ("id", "store_id", "customer_id", "driver_id", "total", "status", "orderdate", "deliverydate") VALUES
(6, 1, 1, NULL, 100000, 'Ordering', '2024-09-20 15:39:36.559', NULL),
(7, 1, 1, 6, 100000, 'Delivering', '2024-09-28 13:57:17.313', NULL),
(14, 10, 1, 3, 95000, 'Delivering', '2024-09-28 14:44:51.799', '2024-09-28 15:02:01.201'),
(15, 1, 1, NULL, 150000, 'Ordering', '2024-10-06 10:31:40.161', NULL),
(16, 1, 1, NULL, 150000, 'Ordering', '2024-10-06 10:35:32.12', NULL),
(17, 1, 1, NULL, 150000, 'Ordering', '2024-10-06 10:36:54.903', NULL),
(18, 1, 1, 4, 150000, 'Delivering', '2024-10-06 13:38:51.274', '2024-10-06 13:47:23.49');

INSERT INTO "public"."OrderFoods" ("orderId", "foodId", "quantity") VALUES
(7, 1, 1),
(7, 2, 2),
(14, 14, 1),
(14, 15, 2),
(15, 1, 2),
(15, 2, 2),
(16, 1, 2),
(16, 2, 2),
(17, 1, 2),
(17, 2, 2),
(18, 1, 2),
(18, 2, 2);

INSERT INTO "public"."Store" ("id", "email", "address") VALUES
(1, 'store1@example.com', '123 Main Street, District 1, Ho Chi Minh City, Vietnam'),
(2, 'store2@example.com', '456 Second Avenue, District 3, Ho Chi Minh City, Vietnam'),
(3, 'store3@example.com', '789 Nguyen Hue Street, District 1, Ho Chi Minh City, Vietnam'),
(4, 'store4@example.com', '101 Tran Hung Dao Road, District 5, Ho Chi Minh City, Vietnam'),
(5, 'store5@example.com', '202 Le Loi Boulevard, District 1, Ho Chi Minh City, Vietnam'),
(6, 'store6@example.com', '303 Hai Ba Trung Street, District 3, Ho Chi Minh City, Vietnam'),
(7, 'store7@example.com', '404 Dien Bien Phu Street, Binh Thanh District, Ho Chi Minh City, Vietnam'),
(8, 'store8@example.com', '505 Vo Van Tan Street, District 3, Ho Chi Minh City, Vietnam'),
(9, 'store9@example.com', '606 Pham Van Dong Street, Thu Duc District, Ho Chi Minh City, Vietnam'),
(10, 'store10@example.com', '707 Cong Hoa Street, Tan Binh District, Ho Chi Minh City, Vietnam');



-- Indices
CREATE UNIQUE INDEX "Customer_email_key" ON public."Customer" USING btree (email);


-- Indices
CREATE UNIQUE INDEX "Driver_email_key" ON public."Driver" USING btree (email);
ALTER TABLE "public"."DriverPayments" ADD FOREIGN KEY ("driverId") REFERENCES "public"."Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."DriverPayments" ADD FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE;
ALTER TABLE "public"."Food" ADD FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE SET NULL;
ALTER TABLE "public"."Food" ADD FOREIGN KEY ("storeId") REFERENCES "public"."Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."Order" ADD FOREIGN KEY ("customer_id") REFERENCES "public"."Customer"("id") ON DELETE CASCADE;
ALTER TABLE "public"."Order" ADD FOREIGN KEY ("store_id") REFERENCES "public"."Store"("id") ON DELETE CASCADE;
ALTER TABLE "public"."Order" ADD FOREIGN KEY ("driver_id") REFERENCES "public"."Driver"("id") ON DELETE SET NULL;
ALTER TABLE "public"."OrderFoods" ADD FOREIGN KEY ("foodId") REFERENCES "public"."Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."OrderFoods" ADD FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE;
ALTER TABLE "public"."OrderPromotions" ADD FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE;
ALTER TABLE "public"."OrderPromotions" ADD FOREIGN KEY ("promotionId") REFERENCES "public"."Promotion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


-- Indices
CREATE UNIQUE INDEX "Store_email_key" ON public."Store" USING btree (email);
