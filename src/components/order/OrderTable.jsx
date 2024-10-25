import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";

// Internal imports
import Status from "@/components/table/Status";
import Tooltip from "@/components/tooltip/Tooltip";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import PrintReceipt from "@/components/form/others/PrintReceipt";
import SelectStatus from "@/components/form/selectOption/SelectStatus";

const OrderTable = ({ orders }) => {
  const { t } = useTranslation();
  const { showDateTimeFormat, currency, getNumberTwo } = useUtilsFunction();

  return (
    <>
      <TableBody className="dark:bg-gray-900">
        {orders?.map((order, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {order?.invoiceNo}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{order?.orderTime}</span>
            </TableCell>

            <TableCell className="text-xs">
              <span className="text-sm">
                {order?.customerName === "N/A" ? "-" : order?.customerName}
              </span>{" "}
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">{order?.method}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">{order?.amount}</span>
            </TableCell>

            <TableCell className="text-xs">
              <Status status={order?.status} />
            </TableCell>

            <TableCell className="text-center">
              <SelectStatus
                uuid={order.uuid} // Correctly passing uuid here
                order={order}
                actions={order.actions}
              />
            </TableCell>

            <TableCell className="text-right flex justify-end">
              <div className="flex justify-between items-center">
                <PrintReceipt orderId={order.id} />

                <span className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600">
                  <Link to={`/order/${order.uuid}`}>
                    <Tooltip
                      id="view"
                      Icon={FiZoomIn}
                      title={t("ViewInvoice")}
                      bgColor="#059669"
                    />
                  </Link>
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default OrderTable;
