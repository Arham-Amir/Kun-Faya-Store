import { getOrders } from "@/lib/actions/actions";

import { auth } from "@clerk/nextjs";
import { AlertOctagon, CheckCheck } from "lucide-react";
import Image from "next/image";

const Orders = async () => {
  const { userId } = auth();
  const orders = await getOrders(userId as string);
  return (
    <div className="px-10 py-5 max-sm:px-3">
      <p className="text-heading3-bold my-10">Your Orders</p>
      {orders && Object.keys(orders).length == 0 ?
        <p className="text-body-medium my-5">You have no orders yet.</p>
        :
        <div className="flex flex-col items-center gap-10">
          {orders?.map((order: OrderType) => (
            <div className="flex flex-col gap-8 p-4 bg-card rounded-lg">
              <div className="flex gap-20 lg:items-center max-md:flex-col max-md:gap-3">
                <p className="text-base-bold">Order ID: {order._id}</p>
                <p className="text-base-bold">
                  Total Amount: Rs.{order.totalAmount}
                </p>
                {order.completed ?
                  <p className="text-green-600"><CheckCheck className="inline mr-1" /> Order Completed</p>
                  :
                  <p className="text-primary"><AlertOctagon className="inline mr-1" /> Pending</p>
                }
              </div>

              <div className="flex flex-col gap-5">
                {order.products?.map((orderItem: OrderItemType) => (
                  <div className="flex gap-4">
                    <Image
                      src={orderItem.product.media[0]}
                      alt={orderItem.product.title}
                      width={100}
                      height={100}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex flex-col justify-between">
                      <p className="text-small-medium">
                        Title:{" "}
                        <span className="text-small-bold">
                          {orderItem.product.title}
                        </span>
                      </p>
                      {orderItem.color && (
                        <p className="text-small-medium">
                          Color:{" "}
                          <span className="text-small-bold">
                            {orderItem.color}
                          </span>
                        </p>
                      )}
                      {orderItem.size && (
                        <p className="text-small-medium">
                          Size:{" "}
                          <span className="text-small-bold">
                            {orderItem.size}
                          </span>
                        </p>
                      )}
                      <p className="text-small-medium">
                        Unit price:{" "}
                        <span className="text-small-bold">{orderItem.product.price}</span>
                      </p>
                      <p className="text-small-medium">
                        Quantity:{" "}
                        <span className="text-small-bold">{orderItem.quantity}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default Orders;

export const dynamic = "force-dynamic";
