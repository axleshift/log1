const mockData = {
    data: [
        {
            _id: "67bdc737dbb825e11192b4bc",
            user_id: "674ad3f27001aa08ce6f0005",
            is_import: true,
            is_residential_address: true,
            contains_danger_goods: false,
            contains_documents: false,
            from: [
                {
                    name: "George Washington",
                    company: "",
                    country: "Philipines",
                    countryCode: "PHP",
                    city: "manila",
                    zipCode: "1004",
                    address: "547 F. cayco street sampaloc manila",
                    address2: "658 F. cayco street sampaloc manila",
                    address3: "769 F. cayco street sampaloc manila",
                    phone: "09185477193",
                    email: "George@gmail.com",
                    taxId: "123456789",
                },
            ],
            to: [
                {
                    name: "John Doe",
                    company: "",
                    country: "America samoa",
                    countryCode: "AQ",
                    city: "Pago Pago",
                    zipCode: "96799",
                    address: "368 Atu'u Road, Pago Pago, American Samoa",
                    address2: "479 Atu'u Road, Pago Pago, American Samoa",
                    address3: "580 Atu'u Road, Pago Pago, American Samoa",
                    phone: " +1 684 633 1234",
                    email: "John@gmail.com",
                    employerId: "",
                },
            ],
            type: "private",
            items: [
                {
                    length: 32,
                    width: 24,
                    height: 1,
                    weight: "45",
                },
            ],
            status: "for dispatch",
            session_id: "67bdbae9cbb9a41bada9df12",
            tracking_number: "AQ-1740490551529",
            created_at: 1740490551529,
            updated_at: 1740490551529,
        },
        // ... other mock data entries
    ],
    totalPages: 1,
    currentPage: 1,
};

export default mockData;
