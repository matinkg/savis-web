"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { showSwal } from "@/helper/swal";

export default function InfluencerDashboard() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<any>(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [bankDetails, setBankDetails] = useState<string>("");

  useEffect(() => {
    const fetchInfluencerData = async () => {
      try {
        const token = getCookie("iAuthToken");
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/influencer/dashboard`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInfo(res.data);
      } catch (err: any) {
        if (err?.response?.status === 401) {
          window.location.href = "/influencer/login";
          return;
        } else {
          setError("خطا در دریافت اطلاعات");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchInfluencerData();
  }, []);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  const handleLogout = async () => {
    const token = getCookie("iAuthToken");
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/influencer/logout`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    window.location.href = "/influencer/login";
  };

  const handleWithdrawRequest = async () => {
    if (withdrawAmount <= 0) {
      showSwal("مقدار برداشت باید بیشتر از صفر باشد.", "warning");
      return;
    }
    if (!paymentMethod) {
      showSwal("لطفاً روش پرداخت را انتخاب کنید.", "warning");
      return;
    }
    if (paymentMethod === "bank_transfer" && !bankDetails) {
      showSwal("لطفاً جزئیات حساب بانکی را وارد کنید.", "warning");
      return;
    }

    const token = getCookie("iAuthToken");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/influencer/withdraw`,
        {
          amount: withdrawAmount,
          payment_method: paymentMethod,
          bank_details: bankDetails,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showSwal("درخواست برداشت وجه ارسال شد.", "success");
      setShowModal(false);
    } catch (err) {
      showSwal("خطا در ارسال درخواست برداشت.", "error");
    }
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (loading)
    return <div className="text-center py-20">در حال بارگذاری...</div>;
  if (error)
    return <div className="text-center text-red-500 py-20">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">داشبورد اینفلوئنسر</h1>
        <div className="space-x-4">
          <button
            onClick={handleOpenModal}
            className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg shadow"
          >
            درخواست برداشت وجه
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow"
          >
            خروج
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "موجودی کل",
            value: `${Number(info.user.balance || 0)?.toLocaleString()} تومان`,
            color: "text-green-500",
            bg: "bg-green-50",
          },
          {
            title: "تعداد سفارش‌ها",
            value: info.total_orders,
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
          {
            title: "مجموع کمیسیون",
            value: `${info.total_commission.toLocaleString()} تومان`,
            color: "text-yellow-500",
            bg: "bg-yellow-50",
          },
          {
            title: "کد معرف",
            value: info.user.referral_code,
            color: "text-purple-500",
            bg: "bg-purple-50",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-xl shadow hover:shadow-2xl transition-all duration-300 cursor-pointer ${item.bg}`}
          >
            <p className="text-gray-500">{item.title}</p>
            <p className={`text-3xl font-extrabold mt-2 ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Referral Link Section */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">لینک دعوت شما</h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            readOnly
            value={`${typeof window !== "undefined" ? window.location.origin : ""}/?ref=${info.user.referral_code}`}
            className="flex-1 p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-700 bg-gray-50 focus:outline-none"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${typeof window !== "undefined" ? window.location.origin : ""}/?ref=${info.user.referral_code}`
              );
              showSwal("لینک با موفقیت کپی شد!", "success");
            }}
            className="px-5 py-3 bg-indigo-500 hover:bg-indigo-600 transition-all text-white text-sm rounded-lg shadow-md"
          >
            کپی لینک
          </button>
        </div>
        <p className="text-gray-500 text-xs mt-2 text-center md:text-right">
          این لینک را با دوستانتان به اشتراک بگذارید و با خرید آنها کسب درآمد
          کنید.
        </p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">درآمد ماهانه</h2>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={info.monthly_earnings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="commission" stroke="#F59E0B" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">سفارش‌ها (تاریخ/مبلغ)</h2>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={info.orders_data.map((item: any) => ({
                ...item,
                date: new Intl.DateTimeFormat("fa-IR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).format(new Date(item.date)),
                amount: Number(item.amount),
              }))}
              barCategoryGap="20%"
            >
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#A5B4FC" stopOpacity={0.3} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 13 }}
                axisLine={false}
                tickLine={false}
                dy={20}
                interval={0}
                height={80}
              />

              <YAxis
                tick={{ fontSize: 13 }}
                tickFormatter={(value) => value.toLocaleString("fa-IR")}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  fontSize: "14px",
                  border: "1px solid #eee",
                }}
                formatter={(value) =>
                  `${Number(value).toLocaleString("fa-IR")} تومان`
                }
                labelFormatter={(label) => `تاریخ: ${label}`}
              />

              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{ fontSize: "13px" }}
              />

              <Bar
                dataKey="amount"
                name="مبلغ سفارش"
                fill="url(#colorBar)"
                radius={[12, 12, 0, 0]}
                animationDuration={2000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Paid Commissions Table */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-bold mb-6 text-center">
          کمیسیون‌های پرداخت شده
        </h2>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-center">شماره سفارش</th>
                <th className="py-3 px-6 text-center">مبلغ کمیسیون</th>
                <th className="py-3 px-6 text-center">درصد کمیسیون</th>
                <th className="py-3 px-6 text-center">تاریخ پرداخت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {info.paid_commissions?.map((commission: any, idx: number) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-3 px-6 text-center">
                    {commission.order_id
                      ? `#${commission.order_id}`
                      : "بدون سفارش"}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {Number(commission.amount).toLocaleString()} تومان
                  </td>
                  <td className="py-3 px-6 text-center">
                    {commission.percent}٪
                  </td>
                  <td className="py-3 px-6 text-center">
                    {new Intl.DateTimeFormat("fa-IR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date(commission.created_at))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdraw Requests Table */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-bold mb-6 text-center">
          درخواست‌های برداشت
        </h2>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-center">تاریخ</th>
                <th className="py-3 px-6 text-center">مبلغ</th>
                <th className="py-3 px-6 text-center">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {info.withdraw_requests?.map((wr: any, idx: number) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-3 px-6 text-center">{wr.requested_at}</td>
                  <td className="py-3 px-6 text-center">
                    {Number(wr.amount).toLocaleString()} تومان
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        wr.status === "paid" ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    >
                      {wr.status === "paid" ? "پرداخت شده" : "در انتظار"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Withdraw Request */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">درخواست برداشت وجه</h2>

            {/* مقدار برداشت */}
            <div className="mb-4">
              <label className="block text-gray-700">مقدار برداشت:</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                placeholder="مقدار برداشت را وارد کنید"
              />
            </div>

            {/* روش پرداخت */}
            <div className="mb-4">
              <label className="block text-gray-700">روش پرداخت:</label>
              <select
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                onChange={(e) => setPaymentMethod(e.target.value)} // برای ذخیره روش پرداخت
              >
                <option value="">انتخاب روش پرداخت</option>
                <option value="bank_transfer">انتقال بانکی</option>
              </select>
            </div>

            {/* جزئیات حساب بانکی (در صورت انتخاب انتقال بانکی) */}
            {paymentMethod === "bank_transfer" && (
              <div className="mb-4">
                <label className="block text-gray-700">
                  جزئیات حساب بانکی:
                </label>
                <input
                  type="text"
                  value={bankDetails}
                  onChange={(e) => setBankDetails(e.target.value)} // برای ذخیره جزئیات حساب بانکی
                  className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                  placeholder="شماره حساب بانکی یا جزئیات"
                />
              </div>
            )}

            <div className="flex justify-between space-x-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
              >
                لغو
              </button>
              <button
                onClick={handleWithdrawRequest}
                className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg"
              >
                ارسال درخواست
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
