ALTER TABLE registrations
    MODIFY COLUMN status ENUM(
    'CONFIRMED',
    'CANCELED'
    ) NOT NULL;