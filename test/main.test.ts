import axios from "axios";
import { v4 as uuidV4 } from "uuid";

test("should create a transaction", async function () {
    const code = uuidV4();
    await axios({
        url: "http://localhost:3000/transactions",
        method: "POST",
        data: {
            code,
            amount: 1000,
            numberInstallments: 12,
            paymentMethod: "credit_card"
        }
    });
    const response = await axios({
        url: `http://localhost:3000/transactions/${code}`,
        method: "GET"
    });
    const transaction = response.data;
    expect(transaction.code).toBe(code);
    expect(transaction.amount).toBe(1000);
    expect(transaction.paymentMethod).toBe("credit_card");
    expect(transaction.installments).toHaveLength(12);
    expect(transaction.installments[0].amount).toBe(83.33);
    expect(transaction.installments[11].amount).toBe(83.37);
});
