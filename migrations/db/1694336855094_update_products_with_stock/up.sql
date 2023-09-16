WITH new_stock_values AS (
    VALUES
        ('Banana', 200),
        ('Lamborghini', 4),
        ('Wooden chair', 3),
        ('OLED TV', 5)
)
UPDATE products AS p
SET stock = ns.column2
FROM new_stock_values AS ns
WHERE p.name = ns.column1;
