-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name_company" TEXT NOT NULL,
    "cnpj" TEXT,
    "payments_methods" TEXT[],
    "imgProfile" TEXT,
    "isSubiscriber" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "backgroundColor" TEXT,
    "pixKey" TEXT,
    "pixType" TEXT,
    "closingTime" TEXT NOT NULL,
    "openingTime" TEXT NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menuofcompanies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "categoria" TEXT,
    "price" TEXT NOT NULL,
    "weight" TEXT,
    "amount" TEXT,
    "companiesId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,

    CONSTRAINT "menuofcompanies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companiesId" TEXT NOT NULL,
    "clientsId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "amoutMoney" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "order" JSONB[],
    "paymentVoucher" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name_company" TEXT,
    "companyId" TEXT,
    "backgroundColor" TEXT,
    "imgProfile" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrdersFinished" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "amountOrders" INTEGER NOT NULL,
    "amountvalue" INTEGER NOT NULL,
    "companyId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrdersFinished_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_id_key" ON "companies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "menuofcompanies_id_key" ON "menuofcompanies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "clients_id_key" ON "clients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_id_key" ON "orders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrdersFinished_id_key" ON "OrdersFinished"("id");

-- AddForeignKey
ALTER TABLE "menuofcompanies" ADD CONSTRAINT "menuofcompanies_companiesId_fkey" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_companiesId_fkey" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
