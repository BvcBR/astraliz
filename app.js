const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/results2/partner17')));
app.use(express.static(path.join(__dirname, 'public/results2')));
app.use(session({
    secret: 'verysecretsecretkey',
    resave: false,
    saveUninitialized: true
}));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const signTranslations = {
    "capricornio": "Capricórnio",
    "aquario": "Aquário",
    "peixes": "Peixes",
    "aries": "Áries",
    "touro": "Touro",
    "gemeos": "Gêmeos",
    "cancer": "Câncer",
    "leao": "Leão",
    "virgem": "Virgem",
    "libra": "Libra",
    "escorpiao": "Escorpião",
    "sagitario": "Sagitário"
};

const paymentOptions = {
    1: 'R$ 27,90',
    2: 'R$ 47,90',
    3: 'R$ 67,90',
    4: 'R$ 97,90'
};

function mapBirthDateToAgeGroup(year, month, day) {
    const birthDate = new Date(year, month - 1, day); // Create a Date object for the birth date
    const currentDate = new Date(); // Get the current date
    let age = currentDate.getFullYear() - birthDate.getFullYear(); // Calculate the age

    // Adjust the age if the birth date hasn't occurred yet this year
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }

    const decade = Math.floor(age / 10) * 10; // Determine the decade of the age
    if (decade <= 10) {
        return 'youth';
    }
    return `${decade}`; // Return the age group as a string
}

function getAstrologicalSign(day, month) {
    const signs = [
        { name: "capricornio", startDate: new Date(0, 0, 1), endDate: new Date(0, 0, 19) },
        { name: "aquario", startDate: new Date(0, 0, 20), endDate: new Date(0, 1, 18) },
        { name: "peixes", startDate: new Date(0, 1, 19), endDate: new Date(0, 2, 20) },
        { name: "aries", startDate: new Date(0, 2, 21), endDate: new Date(0, 3, 19) },
        { name: "touro", startDate: new Date(0, 3, 20), endDate: new Date(0, 4, 20) },
        { name: "gemeos", startDate: new Date(0, 4, 21), endDate: new Date(0, 5, 20) },
        { name: "cancer", startDate: new Date(0, 5, 21), endDate: new Date(0, 6, 22) },
        { name: "leao", startDate: new Date(0, 6, 23), endDate: new Date(0, 7, 22) },
        { name: "virgem", startDate: new Date(0, 7, 23), endDate: new Date(0, 8, 22) },
        { name: "libra", startDate: new Date(0, 8, 23), endDate: new Date(0, 9, 22) },
        { name: "escorpiao", startDate: new Date(0, 9, 23), endDate: new Date(0, 10, 21) },
        { name: "sagitario", startDate: new Date(0, 10, 22), endDate: new Date(0, 11, 21) },
        { name: "capricornio", startDate: new Date(0, 11, 22), endDate: new Date(0, 11, 31) }
    ];

    const birthDate = new Date(0, month - 1, day);

    for (const sign of signs) {
        if (birthDate >= sign.startDate && birthDate <= sign.endDate) {
            return sign.name;
        }
    }

    return "Unknown";
}

app.get('/quiz0', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz0.html'));
});

app.get('/quiz1', (req, res) => {
    req.session.gender = req.query.gender === 'male' ? 'homem' : 'mulher';
    res.sendFile(path.join(__dirname, 'public', 'quiz1_part1.html'));
});

app.get('/quiz2', (req, res) => {
    req.session.flow = 'single';
    res.sendFile(path.join(__dirname, 'public', 'quiz2_part1.html'));
});

app.get('/quiz3', (req, res) => {
    const goalQuery = req.query.goal; // Extract the goal query parameter
    const goal = goalQuery ? goalQuery.replace(/-/g, ' ') : 'Alcançar seus objetivos'; // Replace hyphens with spaces
    req.session.goal = goal; // Store the goal in the session
    backPath = req.session.flow === 'single' ? 'quiz2' : 'partner2';
    nextPath = 'quiz4';
    res.render('quiz3_part1', { backPath, nextPath });
});

app.get('/quiz4', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz4_part1.html'));
});

app.get('/quiz5', (req, res) => {
    req.session.hasChildren = req.query.hasChildren === 'yes';
    res.sendFile(path.join(__dirname, 'public', 'quiz5_part1.html'));
});

app.get('/quiz6', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz6_part1.html'));
});

app.get('/quiz7', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz 7_part1.html'));
});

app.get('/quiz8', (req, res) => {
    day = req.query.day;
    month = req.query.month;
    gender = req.session.gender;
    sign = getAstrologicalSign(day, month);
    req.session.sign = sign;
    file = `quiz8-${sign}-${gender}_part1.html`;
    req.session.year = req.query.year;
    req.session.month = month;
    req.session.day = day;
    if (day == null || month == null || sign == 'Unknown' || sign == null) {
        // Handle the case where any of the items is null or undefined
        res.redirect('/quiz7');
    }
    if (gender == null) {
        res.redirect('/quiz1');
    }
    res.sendFile(path.join(__dirname, 'public', file));
});

app.get('/quiz9', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz9_part1.html'));
});

app.get('/quiz10-1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/quiz10-1', 'part_1.html'));
});

app.get('/quiz10-2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz10-2_part1.html'));
});

app.get('/quiz11', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz11_part1.html'));
});

app.get('/quiz12', (req, res) => {
    const gender = req.session.gender === 'homem' ? 'homens' : 'mulheres';
    const sign = signTranslations[req.session.sign];
    const goal = req.session.goal;
    res.render('quiz12_part1', { gender: gender, sign: sign, goal: goal });
});

app.get('/quiz13', (req, res) => {
    console.log(req.session.sign)
    let sign = signTranslations[req.session.sign];
    console.log(sign)
    const gender = 'homem' === req.session.gender ? 'Homens' : 'Mulheres';
    const goal = req.session.goal;
    const ageGroup = mapBirthDateToAgeGroup(req.session.year, req.session.month, req.session.day);
    const haveChildren = req.session.hasChildren ? 'tem filhos' : 'não tem filhos';
    console.log(ageGroup)
    console.log(!sign || !ageGroup)
    if (!sign || !ageGroup) {
        res.redirect('/quiz7');
    }
    if (!gender) {
        res.redirect('/quiz1');
    }
    if (req.session.flow === 'partner') {
        res.render('partner13.ejs', { sign: sign, gender: gender, age_group: ageGroup, have_children: haveChildren, goal: goal });
    } else {
        res.render('quiz13_part1.ejs', { sign: sign, gender: gender, age_group: ageGroup, have_children: haveChildren, goal: goal });
    }
});

app.get('/quiz14', (req, res) => {
    const quiz13 = req.query.quiz13;
    if (quiz13 == 1 || quiz13 == 2) {
        res.sendFile(path.join(__dirname, 'public/results2/quiz13-1', 'part_1.html'));
    } else if (quiz13 == 3) {
        res.sendFile(path.join(__dirname, 'public/results2/quiz13-3', 'part_1.html'));
    } else {
        res.sendFile(path.join(__dirname, 'public/results2/quiz13-4', 'part_1.html'));
    }
});

app.get('/partner14', (req, res) => {
    const partner13 = req.query.partner13;
    if (partner13 == 1) {
        res.sendFile(path.join(__dirname, 'public/results2/partner13-1', 'part_1.html'));
    } else if (partner13 == 2) {
        res.sendFile(path.join(__dirname, 'public/results2/partner13-2', 'part_1.html'));
    } else {
        res.sendFile(path.join(__dirname, 'public/results2/partner13-3', 'part_1.html'));
    }
});

app.get('/quiz15', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz15_part1.html'));
});

app.get('/quiz16', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz16_part1.html'));
});

app.get('/quiz17', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz17_part1.html'));
});

app.get('/quiz18', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz18_part1.html'));
});

app.get('/quiz19', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz19_part1.html'));
});

app.get('/quiz20', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz20_part1.html'));
});

app.get('/quiz21', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz21_part1.html'));
});

app.get('/quiz22', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz22_part1.html'));
});

app.get('/quiz23', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz23_part1.html'));
});

app.get('/quiz24', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz24_part1.html'));
});

app.get('/quiz25', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz25_part1.html'));
});

app.get('/quiz26', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz26_part1.html'));
});

app.get('/quiz27', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz27_part1.html'));
});

app.get('/quiz28', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz28_part1.html'));
});

app.get('/quiz29', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz29_part1.html'));
});


app.get('/quiz30', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz30_part1.html'));
});

app.get('/quiz31', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz31_part1.html'));
});

app.get('/quiz32', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz32_part1.html'));
});

app.get('/quiz33', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz33_part1.html'));
});

app.get('/quiz34', (req, res) => {
    const quiz33 = req.query.quiz33;
    if (quiz33 == 0) {
        res.render('quiz34-1_part1.ejs', { sign: signTranslations[req.session.sign] });
    } else if (quiz33 == 1) {
        res.render('quiz34-2_part1.ejs', { sign: signTranslations[req.session.sign] });
    } else {
        res.render('quiz34-3_part1.ejs', { sign: signTranslations[req.session.sign] });
    }
    // Mandar o arquivo com base na resposta do quiz 33
});

app.get('/quiz35', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz35_part1.html'));
});

app.get('/quiz36', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz36_part1.html'));
});

app.get('/quiz37', (req, res) => {
    const quiz36 = req.query.quiz36;
    const sign = signTranslations[req.session.sign];
    if (!sign) {
        return res.redirect('/quiz7');
    }
    if (quiz36 == 0) {
        res.render('quiz37-1_part1.ejs', { sign: sign });
    } else if (quiz36 == 1) {
        res.render('quiz37-2_part1.ejs', { sign: sign });
    } else {
        res.render('quiz37-3_part1.ejs', { sign: sign });
    }
});

app.get('/quiz38', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz38_part1.html'));
});

app.get('/quiz39', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz39_part1.html'));
});

app.get('/quiz40', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz40_part1.html'));
});

app.get('/quiz41', (req, res) => {
    const payment = req.query.payment;
    let userPaymentValue = "R$ 27,90";
    let userPaymentlink = "https://pay.kirvano.com/dc6f3e08-b7f3-41b7-a908-1eec731aba7e";
    if (payment == 2) {
        userPaymentValue = paymentOptions[2];
        userPaymentlink = "https://pay.kirvano.com/36c95841-a5d0-4c12-afc9-3d7151335814";
    } else if (payment == 3) {
        userPaymentValue = paymentOptions[3];
        userPaymentlink = "https://pay.kirvano.com/9b7a9bf9-e931-41fd-bb7b-ca91903c7dd7";
    } else if (payment == 4) {
        userPaymentValue = paymentOptions[4];
        userPaymentlink = "https://pay.kirvano.com/a50eebf7-a7a0-4bbe-8cdc-8eeaabf8c699";
    }

    const userGender = req.session.gender === 'homem' ? 'Masculino' : 'Feminino';
    const userSign = signTranslations[req.session.sign];
    const userGoal = req.session.goal;
    const userImage = `${userSign.toLowerCase()}_${req.session.gender.toLowerCase()}_0.png`;
    res.render('quiz41_part1.ejs', { userGender, userSign, userGoal, userPaymentValue, userPaymentlink });
});


app.get('/partner15', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner15', 'part_1.html'));
});

app.get('/partner23', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner23', 'part_1.html'));
});

app.get('/partner24', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner24', 'part_1.html'));
});

app.get('/partner25', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner25', 'part_1.html'));
});

app.get('/partner22', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner22', 'part_1.html'));
});

app.get('/partner13', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner13', 'part_1.html'));
});

app.get('/partner18-2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner18-2', 'part_1.html'));
});

app.get('/partner33-3', (req, res) => {
    res.redirect('/quiz36');
});

app.get('/partner2', (req, res) => {
    req.session.flow = 'partner';
    res.sendFile(path.join(__dirname, 'public/results2/partner2', 'part_1.html'));
});

app.get('/partner33-2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner33-2', 'part_1.html'));
});

app.get('/partner31-1', (req, res) => {
    res.render('partner31-1.ejs', { sign: signTranslations[req.session.sign] });
});

app.get('/partner24-2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner24-2', 'part_1.html'));
});

app.get('/partner31', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner31', 'part_1.html'));
});

app.get('/partner30', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner30', 'part_1.html'));
});

app.get('/partner29', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner29', 'part_1.html'));
});

app.get('/partner16', (req, res) => {
    const partnerGender = req.query.gender;
    req.session.partnerGender = partnerGender;
    res.sendFile(path.join(__dirname, 'public/results2/partner16', 'part_1.html'));
});

app.get('/partner18', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner18', 'part_1.html'));
});

app.get('/partner27', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner27', 'part_1.html'));
});

app.get('/relationshipPayment', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/relationshipPayment', 'part_1.html'));
});

app.get('/partner20', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner20', 'part_1.html'));
});

app.get('/partner21', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner21', 'part_1.html'));
});

app.get('/partner19', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner19', 'part_1.html'));
});

app.get('/partner26', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner26', 'part_1.html'));
});

app.get('/partner28', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner28', 'part_1.html'));
});

app.get('/partner17', (req, res) => {
    const day = req.query.day;
    const month = req.query.month;
    const gender = req.session.gender;
    let partnerSign = getAstrologicalSign(day, month);
    req.session.partnerSign = partnerSign;
    let userSign = req.session.sign;
    const userImage = `${userSign}_${gender}_0.png`;
    const partnerImage = `${partnerSign}_${req.session.partnerGender}_0.png`;
    const userGender = gender === "mulher" ? "Mulheres" : "Homens";
    const partnerGender = req.session.partnerGender === "mulher" ? "Mulher" : "Homem";
    const partnerTextGender = req.session.partnerGender === "mulher" ? "mulheres" : "homens";
    userSign = signTranslations[userSign].toLowerCase();
    partnerSign = signTranslations[partnerSign].toLowerCase();
    res.render('partner17.ejs', { userImage, partnerImage, userGender, partnerGender, userSign, partnerSign, partnerTextGender });
});

app.get('/partner31-3', (req, res) => {
    res.render('partner31-3.ejs', { sign: signTranslations[req.session.sign] });
});

app.get('/partner18-1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner18-1', 'part_1.html'));
});

app.get('/partner33-1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner33-1', 'part_1.html'));
});

app.get('/partner31-2', (req, res) => {
    res.render('partner31-2.ejs', { sign: signTranslations[req.session.sign] });
});

app.get('/partner24-1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner24-1', 'part_1.html'));
});

app.get('/partner32', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/results2/partner32', 'part_1.html'));
});

app.get('/partner33', (req, res) => {
    res.redirect('/quiz36');
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
