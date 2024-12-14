module default {
    type Cutie {
        required property name -> str;
        property createdAt -> datetime {
            default := datetime_current();
        }
    }
}
