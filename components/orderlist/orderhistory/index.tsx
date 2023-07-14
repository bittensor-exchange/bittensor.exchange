import { IRoot } from '@/data/store';
import useApi from '@/hooks/useApi';
import { Button } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import moment from 'moment';
import numbro from 'numbro';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DataGridStyle } from '..';

export default function OrderHistory() {

  const columns: GridColDef[] = [
    { field: 'createdAt', flex: 0.5, headerName: 'Time', minWidth: 140,
      valueGetter: (params: GridValueGetterParams) => moment(params.row.createdAt).format('YYYY-MM-DD HH:mm:ss')
    },
    { field: 'pairName', flex: 0.5, headerName: 'Pair', },
    { field: 'type', flex: 0.5, headerName: 'Type' },
    { field: 'action', flex: 0.5, headerName: 'Buy/Sell', renderCell: (params: GridValueGetterParams) => <div className={params.row.action === 'buy' ? 'text-buy' : 'text-sell'}>{params.row.action}</div> },
    { field: 'price', flex: 0.5, headerName: 'Price', minWidth: 130,
      valueGetter: (params: GridValueGetterParams) =>
      `${numbro(params.row.price).format({mantissa: 6, trimMantissa: true})} ${params.row.pair.token2}`,
    },
    { field: 'amount', flex: 0.5, headerName: 'Amount', minWidth: 130,
      valueGetter: (params: GridValueGetterParams) =>
      `${numbro(params.row.amount).format({mantissa: 6, trimMantissa: true})} ${params.row.pair.token1}`,
    },
    { field: 'filled', flex: 0.5, headerName: 'Filled', valueGetter: (params: GridValueGetterParams) => params.row.filled + " " + params.row.pair.token1 },
    { field: 'avg.price', flex: 0.5, headerName: 'Avg.Price', valueGetter: ({ row }: GridValueGetterParams) => !row.filled ? "" : numbro((row.spent - (row.action == 'buy' ? row.fee : 0)) / row.filled).format({mantissa: 6, trimMantissa: true}) },
    { field: 'status', flex: 0.5, headerName: 'Status'},
  ];

  const openOrders = useSelector((state:IRoot) => state.api.openOrders);
  const { data: rows, loading, mutate } = useApi('/api/orders/history');

  useEffect(() => {
    if(openOrders > 0) mutate();
  }, [openOrders])

  return (
    <div className='w-full h-full'>
      <DataGrid
        rows={rows || []}
        columns={columns}
        hideFooterPagination
        hideFooter
        loading={loading}
        rowSelection={false}
        sx={DataGridStyle}
      />
    </div>
  );
}
