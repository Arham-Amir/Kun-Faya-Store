import { getOrders } from "@/lib/actions/actions";
import { PageHeader } from "@/components/PageHeader";
import { auth } from "@clerk/nextjs";
import { AlertOctagon, CheckCheck } from "lucide-react";
import Image from "next/image";

const Orders = async () => {
  const { userId } = auth();
  const orders = await getOrders(userId as string);

  return (
    <div className="flex flex-col gap-10 pb-10">
      <PageHeader
        title="Your Orders"
        description={orders && Object.keys(orders).length > 0
          ? `${orders.length} ${orders.length === 1 ? 'order' : 'orders'} placed`
          : "Track and manage your orders"}
      />

      <div className="container mx-auto px-4 md:px-10">
        {orders && Object.keys(orders).length == 0 ?
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">You haven't placed any orders yet</p>
            <p className="text-gray-500 mt-2">Start shopping to see your orders here!</p>
          </div>
          :
          <div className="flex flex-col items-center gap-6">
            {orders?.map((order: OrderType) => (
              <div key={order._id} className="w-full max-w-4xl flex flex-col gap-6 p-6 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow border">
                <div className="flex gap-8 lg:items-center max-md:flex-col max-md:gap-3 pb-4 border-b">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="font-mono text-sm">{order._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                    <p className="text-xl font-bold text-primary">Rs. {order.totalAmount}</p>
                  </div>
                  <div>
                    {order.completed ?
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-medium">
                        <CheckCheck size={18} /> Completed
                      </span>
                      :
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full font-medium">
                        <AlertOctagon size={18} /> Pending
                      </span>
                    }
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {order.products?.map((orderItem: OrderItemType) => (
                    <div key={orderItem.product._id} className="flex gap-4 p-4 bg-background rounded-lg border">
                      <Image
                        src={orderItem.product.media[0]}
                        alt={orderItem.product.title}
                        width={100}
                        height={100}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="font-bold text-lg mb-2">{orderItem.product.title}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            {orderItem.color && (
                              <span>Color: <span className="font-semibold text-foreground">{orderItem.color}</span></span>
                            )}
                            {orderItem.size && (
                              <span>Size: <span className="font-semibold text-foreground">{orderItem.size}</span></span>
                            )}
                            <span>Quantity: <span className="font-semibold text-foreground">{orderItem.quantity}</span></span>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-primary">Rs. {orderItem.product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default Orders;

export const dynamic = "force-dynamic";
