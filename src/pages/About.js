import React from "react";

const About = () => {
    return (
        <div className=" py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
                        О нас
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        Добро пожаловать на нашу биржу фриланса! Мы создаем инновационное
                        пространство, где заказчики находят исполнителей для выполнения своих задач, а профессионалы получают доступ к интересным проектам.
                    </p>
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Почему мы?
                        </h2>
                        <ul className="list-disc list-inside text-gray-600 text-lg leading-relaxed">
                            <li>
                                Используем систему оплаты <span className="font-bold">PayPal</span>, чтобы гарантировать безопасность транзакций между заказчиками и исполнителями.
                            </li>
                            <li>
                                Поддерживаем интеграцию с <span className="font-bold">Dropbox</span>, чтобы вы могли удобно загружать и обмениваться файлами.
                            </li>
                            <li>
                                Настроена автоматическая рассылка уведомлений на почту, чтобы вы не пропустили важные обновления и предложения.
                            </li>
                            <li>
                                Интеллектуальная система подбора задач на основе компетенций исполнителей.
                            </li>
                            <li>
                                Современный и удобный интерфейс, разработанный с учетом потребностей пользователей.
                            </li>
                        </ul>
                    </div>
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Наши ключевые особенности
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Мы понимаем, что время — это ценный ресурс, поэтому наша биржа автоматизирует
                            и упрощает большинство процессов. Вот что мы предлагаем:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                            <div className="bg-gray-50 p-6 rounded-lg shadow">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">
                                    Безопасные платежи
                                </h3>
                                <p className="text-gray-600">
                                    Благодаря интеграции с PayPal мы обеспечиваем полную прозрачность и надежность всех финансовых операций.
                                </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg shadow">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">
                                    Хранение данных
                                </h3>
                                <p className="text-gray-600">
                                    Интеграция с Dropbox позволяет безопасно хранить и обмениваться файлами между участниками.
                                </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg shadow">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">
                                    Уведомления
                                </h3>
                                <p className="text-gray-600">
                                    Получайте мгновенные уведомления о новых заказах, сообщениях и статусе ваших проектов через email.
                                </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg shadow">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">
                                    Гибкая система фильтров
                                </h3>
                                <p className="text-gray-600">
                                    Удобные фильтры позволяют быстро находить подходящие проекты или исполнителей.
                                </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg shadow">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">
                                    Рейтинговая система
                                </h3>
                                <p className="text-gray-600">
                                    Оставляйте отзывы и оценки, чтобы поддерживать высокий уровень доверия на платформе.
                                </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg shadow">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">
                                    Интеллектуальный подбор
                                </h3>
                                <p className="text-gray-600">
                                    Наша система помогает заказчикам находить исполнителей, идеально подходящих для выполнения задач.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Наши цели
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Наша миссия — объединить заказчиков и исполнителей по всему миру, создавая
                            комфортные условия для сотрудничества. Мы стремимся стать лучшей платформой для
                            работы в удаленном формате, предоставляя современный инструмент для всех участников.
                        </p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Присоединяйтесь к нам!
                        </h2>
                        <p className="text-gray-600 text-lg mb-6">
                            Давайте создавать будущее удаленной работы вместе. Наша платформа уже открыта для новых пользователей.
                        </p>
                        <a
                            href="/user-auth"
                            className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-600"
                        >
                            Зарегистрироваться
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;