import {
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  WindmillContext,
} from "@windmill/react-ui";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from "react-icons/fi";
import { ImCreditCard, ImStack } from "react-icons/im";

//internal import
import useAsync from "@/hooks/useAsync";
import useFilter from "@/hooks/useFilter";
import LineChart from "@/components/chart/LineChart/LineChart";
import PieChart from "@/components/chart/Pie/PieChart";
import CardItem from "@/components/dashboard/CardItem";
import CardItemTwo from "@/components/dashboard/CardItemTwo";
import ChartCard from "@/components/chart/ChartCard";
import OrderTable from "@/components/order/OrderTable";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import OrderServices from "@/services/OrderServices";
import AnimatedContent from "@/components/common/AnimatedContent";

const Dashboard = () => {
  const { t } = useTranslation();
  const { mode } = useContext(WindmillContext);

  dayjs.extend(isBetween);
  dayjs.extend(isToday);
  dayjs.extend(isYesterday);

  const { currentPage, handleChangePage } = useContext(SidebarContext);

  // react hook
  const [todayOrderAmount, setTodayOrderAmount] = useState(0);
  const [yesterdayOrderAmount, setYesterdayOrderAmount] = useState(0);
  const [salesReport, setSalesReport] = useState([]);
  const [todayCashPayment, setTodayCashPayment] = useState(0);
  const [todayCardPayment, setTodayCardPayment] = useState(0);
  const [todayCreditPayment, setTodayCreditPayment] = useState(0);
  const [yesterdayCashPayment, setYesterdayCashPayment] = useState(0);
  const [yesterdayCardPayment, setYesterdayCardPayment] = useState(0);
  const [yesterdayCreditPayment, setYesterdayCreditPayment] = useState(0);

  const {
    data: bestSellerProductChart,
    loading: loadingBestSellerProduct,
    error,
  } = useAsync(OrderServices.getBestSellerProductChart);

  const { data: dashboardRecentOrder, loading: loadingRecentOrder } = useAsync(
    () => OrderServices.getDashboardRecentOrder({ page: currentPage, limit: 8 })
  );

  const { data: dashboardOrderCount, loading: loadingOrderCount } = useAsync(
    OrderServices.getDashboardCount
  );

  const { data: dashboardOrderAmount, loading: loadingOrderAmount } = useAsync(
    OrderServices.getDashboardAmount
  );

  // console.log("dashboardOrderCount", dashboardOrderCount);

  const { dataTable, serviceData } = useFilter(dashboardRecentOrder?.orders);

  useEffect(() => {
    // today orders show
    const todayOrder = dashboardOrderAmount?.ordersData?.filter((order) =>
      dayjs(order.updatedAt).isToday()
    );
    //  console.log('todayOrder',dashboardOrderAmount.ordersData)
    const todayReport = todayOrder?.reduce((pre, acc) => pre + acc.total, 0);
    setTodayOrderAmount(todayReport);

    // yesterday orders
    const yesterdayOrder = dashboardOrderAmount?.ordersData?.filter((order) =>
      dayjs(order.updatedAt).set(-1, "day").isYesterday()
    );

    const yesterdayReport = yesterdayOrder?.reduce(
      (pre, acc) => pre + acc.total,
      0
    );
    setYesterdayOrderAmount(yesterdayReport);

    // sales orders chart data
    const salesOrderChartData = dashboardOrderAmount?.ordersData?.filter(
      (order) =>
        dayjs(order.updatedAt).isBetween(
          new Date().setDate(new Date().getDate() - 7),
          new Date()
        )
    );

    salesOrderChartData?.reduce((res, value) => {
      let onlyDate = value.updatedAt.split("T")[0];

      if (!res[onlyDate]) {
        res[onlyDate] = { date: onlyDate, total: 0, order: 0 };
        salesReport.push(res[onlyDate]);
      }
      res[onlyDate].total += value.total;
      res[onlyDate].order += 1;
      return res;
    }, {});

    setSalesReport(salesReport);

    const todayPaymentMethodData = [];

    const todayCsCdCit = Object.values(
      todayPaymentMethodData.reduce((r, { paymentMethod, total }) => {
        if (!r[paymentMethod]) {
          r[paymentMethod] = { paymentMethod, total: 0 };
        }
        r[paymentMethod].total += total;

        return r;
      }, {})
    );
    const today_cash_payment = todayCsCdCit.find(
      (el) => el.paymentMethod === "Cash"
    );
    setTodayCashPayment(today_cash_payment?.total);
    const today_card_payment = todayCsCdCit.find(
      (el) => el.paymentMethod === "Card"
    );
    setTodayCardPayment(today_card_payment?.total);
    const today_credit_payment = todayCsCdCit.find(
      (el) => el.paymentMethod === "Credit"
    );
    setTodayCreditPayment(today_credit_payment?.total);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardOrderAmount]);

  const totalOrder =
    (dashboardOrderCount?.totals?.canceled || 0) +
    (dashboardOrderCount?.totals?.pending || 0) +
    (dashboardOrderCount?.totals?.delivered || 0) +
    (dashboardOrderCount?.totals?.processing || 0);
  return (
    <>
      <PageTitle>{t("DashboardOverview")}</PageTitle>

      <AnimatedContent>
        <div className="grid gap-2 mb-8 xl:grid-cols-5 md:grid-cols-2">
          <CardItemTwo
            mode={mode}
            title="Today Order"
            title2="TodayOrder"
            Icon={ImStack}
            price={dashboardOrderAmount?.amounts?.todayOrders || 0}
            className="text-white dark:text-emerald-100 bg-teal-600"
            loading={loadingOrderAmount}
          />

          <CardItemTwo
            mode={mode}
            title="Yesterday Order"
            title2="YesterdayOrder"
            Icon={ImStack}
            price={dashboardOrderAmount?.amounts?.yesterdayOrders || 0}
            className="text-white dark:text-orange-100 bg-orange-400"
            loading={loadingOrderAmount}
          />

          <CardItemTwo
            mode={mode}
            title="This Month"
            title2="ThisMonth"
            Icon={FiShoppingCart}
            price={dashboardOrderAmount?.amounts?.thisMonthOrders || 0}
            className="text-white dark:text-emerald-100 bg-blue-500"
            loading={loadingOrderAmount}
          />

          <CardItemTwo
            mode={mode}
            title="Last Month"
            title2="LastMonth"
            Icon={ImCreditCard}
            loading={loadingOrderAmount}
            price={dashboardOrderAmount?.amounts?.lastMonthOrders || 0}
            className="text-white dark:text-teal-100 bg-cyan-600"
          />

          <CardItemTwo
            mode={mode}
            title2="AllTimeSales"
            Icon={ImCreditCard}
            price={dashboardOrderAmount?.amounts?.allTimeOrders || 0}
            className="text-white dark:text-emerald-100 bg-emerald-600"
            loading={loadingOrderAmount}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <CardItem
            title={t("TotalOrder")}
            Icon={FiShoppingCart}
            loading={loadingOrderCount}
            quantity={totalOrder || 0}
            className="text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
          />
          <CardItem
            title={t("OrderPending")}
            Icon={FiRefreshCw}
            loading={loadingOrderCount}
            quantity={dashboardOrderCount?.totals?.pending}
            amount={dashboardOrderCount?.totalPendingOrder?.total}
            className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
          />
          <CardItem
            title={t("OrderProcessing")}
            Icon={FiTruck}
            loading={loadingOrderCount}
            quantity={dashboardOrderCount?.totals?.processing || 0}
            className="text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
          />
          <CardItem
            title={t("OrderDelivered")}
            Icon={FiCheck}
            loading={loadingOrderCount}
            quantity={dashboardOrderCount?.totals?.delivered || 0}
            className="text-emerald-600 dark:text-emerald-100 bg-emerald-100 dark:bg-emerald-500"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 my-8">
          <ChartCard
            mode={mode}
            loading={loadingOrderAmount}
            title={t("WeeklySales")}
          >
            <LineChart salesReport={salesReport} />
          </ChartCard>

          <ChartCard
            mode={mode}
            loading={loadingBestSellerProduct}
            title={t("BestSellingProducts")}
          >
            <PieChart data={bestSellerProductChart} />
          </ChartCard>
        </div>
      </AnimatedContent>
    </>
  );
};

export default Dashboard;
