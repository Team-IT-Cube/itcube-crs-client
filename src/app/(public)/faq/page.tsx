import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

const faqSections = [
    {
        title: "Об IT-Cube",
        items: [
            {
                question: "Какой возраст для записи на курсы?",
                answer: "Курсы IT-Cube Батайск предназначены для детей и подростков от 10 до 17 лет. Для каждого направления подобрана программа с учётом возраста и уровня подготовки.",
            },
            {
                question: "Нужен ли свой ноутбук?",
                answer: "Нет, приносить ноутбук необязательно. В IT-Cube есть все необходимое оборудование для занятий. Если хотите заниматься дома — можно использовать свой компьютер.",
            },
            {
                question: "Как проходят занятия?",
                answer: "Все занятия проводятся очно в центре IT-Cube Батайск. Расписание каждого курса указано в каталоге. Онлайн формат не предусмотрен.",
            },
            {
                question: "Сколько длится курс?",
                answer: "Продолжительность зависит от направления. Расписание и количество занятий указаны на странице каждого курса в каталоге.",
            },
            {
                question: "Какие направления есть в IT-Cube?",
                answer: "Python разработка, Java разработка, VR/AR приложения, робототехника, мобильная разработка и работа с большими данными.",
            },
        ],
    },
    {
        title: "Как пользоваться системой",
        items: [
            {
                question: "Как записаться на курс?",
                answer: "Зарегистрируйтесь на сайте → перейдите в каталог курсов → выберите нужный курс → нажмите кнопку «Записаться». Заявка будет отправлена администратору на рассмотрение.",
            },
            {
                question: "Как узнать статус моей заявки?",
                answer: "Войдите в личный кабинет и перейдите во вкладку «Мои заявки». Там отображается статус каждой заявки: ожидает, подтверждена или отклонена.",
            },
            {
                question: "Что делать если заявку отклонили?",
                answer: "Если заявка отклонена — вы можете подать новую заявку на этот же курс или выбрать другое направление в каталоге.",
            },
            {
                question: "Где смотреть расписание?",
                answer: "Расписание каждого курса указано в каталоге на карточке курса. После подтверждения заявки расписание также отображается в личном кабинете.",
            },
            {
                question: "Как посмотреть свою посещаемость?",
                answer: "Войдите в личный кабинет и перейдите во вкладку «Посещаемость». Там отображается журнал занятий с отметками присутствия и процент посещаемости по каждому курсу.",
            },
            {
                question: "Как зарегистрироваться?",
                answer: "Нажмите кнопку «Зарегистрироваться» в шапке сайта. Заполните имя, email и пароль. После регистрации вы автоматически войдёте в систему и сможете записаться на курсы.",
            },
        ],
    },
]

export default function FAQPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-16">
            <div className="mb-12">
                <h1 className="text-3xl font-semibold text-gray-900 mb-3">FAQ. Часто задаваемые вопросы</h1>
                <p className="text-gray-500">Ответы на популярные вопросы об IT-Cube и о том как пользоваться системой</p>
            </div>

            <div className="space-y-12">
                {faqSections.map((section) => (
                    <div key={section.title}>
                        <h2 className="text-lg font-medium text-gray-900 mb-4 pb-3 border-b border-gray-100">
                            {section.title}
                        </h2>
                        <Accordion type="single" collapsible defaultValue="shipping" className="space-y-2">
                            {section.items.map((item) => (
                                <AccordionItem
                                    key={item.question}
                                    value={item.question}
                                    className="group border border-gray-100 rounded-lg"
                                >
                                    <AccordionTrigger className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-gray-900 list-none">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ))}
            </div>

        </main>
    )
}