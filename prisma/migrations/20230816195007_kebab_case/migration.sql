-- CreateTable
CREATE TABLE "invoices" (
    "invoice_id" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "payment_due" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "payment_terms" INTEGER NOT NULL,
    "client_name" TEXT NOT NULL,
    "client_email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("invoice_id")
);

-- CreateTable
CREATE TABLE "sender" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "sender_id" INTEGER NOT NULL,

    CONSTRAINT "sender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "client_id" INTEGER NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invoices_id_key" ON "invoices"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sender_sender_id_key" ON "sender"("sender_id");

-- CreateIndex
CREATE UNIQUE INDEX "client_client_id_key" ON "client"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "items_item_id_key" ON "items"("item_id");

-- AddForeignKey
ALTER TABLE "sender" ADD CONSTRAINT "sender_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "invoices"("invoice_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "invoices"("invoice_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "invoices"("invoice_id") ON DELETE RESTRICT ON UPDATE CASCADE;
