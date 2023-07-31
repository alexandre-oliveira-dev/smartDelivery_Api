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

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menuofcompanies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "categoria" TEXT,
    "price" INTEGER NOT NULL,
    "weight" TEXT,
    "amount" TEXT,
    "companiesId" TEXT NOT NULL,

    CONSTRAINT "menuofcompanies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_id_key" ON "companies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "menuofcompanies_id_key" ON "menuofcompanies"("id");

-- AddForeignKey
ALTER TABLE "menuofcompanies" ADD CONSTRAINT "menuofcompanies_companiesId_fkey" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
