create schema store;

create table store.transaction (
	code text primary key,
	amount numeric,
	number_installments integer,
	payment_method text,
	date timestamp default now()
);

create table store.installment (
	code text references store.transaction (code),
	number integer,
	amount numeric,
	primary key (code, number)
);
