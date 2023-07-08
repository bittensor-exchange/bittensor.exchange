import Assets from "@/components/assets";
import Chart from "@/components/chart";
import OrderBook from "@/components/orderbook";
import OrderControl from "@/components/ordercontrol";
import OrderList from "@/components/orderlist";

export default function Dashboard() {
  
  return (
      <div className="relative flex max-h-full h-full">
        <div className="min-w-[500px] w-[500px] flex flex-col h-full">
          <div className="flex-grow flex shrink">
            <Assets />
            <OrderBook />
          </div>
          <div className="flex w-full items-between border-t dark:border-zinc-800">
            <OrderControl />
          </div>
        </div>
        <div className="flex flex-col flex-grow h-full text-[32px] from-zinc-200 font-mono lg:flex-grow lg:m-w-[500px] border-l dark:border-zinc-800">
          <Chart />
          <OrderList />
        </div>
      </div>
  )
}