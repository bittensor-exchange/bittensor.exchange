import { IRoot } from '@/data/store';
import useApi from '@/hooks/useApi';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import moment from 'moment';
import numbro from 'numbro';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DataGridStyle } from '..';

export default function Deposits() {

  const columns: GridColDef[] = [
    { field: 'token', flex:0.5, headerName: 'Coin', minWidth: 40 },
    { field: 'confirmedAt', flex:0.5, headerName: 'Time', minWidth: 140,
      valueGetter: (params: GridValueGetterParams) => moment(params.row.confirmedAt).format('YYYY-MM-DD HH:mm:ss')
    },
    { field: 'sender_address', flex:0.5, headerName: 'Sender', minWidth: 400
    },
    { field: 'amount', flex:0.5, headerName: 'Amount', minWidth: 100,
      valueGetter: ({ row }: GridValueGetterParams) => `${numbro(row.amount).format({mantissa: 6, trimMantissa: true})}`,
    },
    { field: 'txHash', flex:0.5, headerName: 'Blockchain Record', renderCell: ({ row }: GridValueGetterParams) => 
      <a href={row.txLink ?? "#"} target='_blank' className='text-buy'>View Transaction</a>, 
      minWidth: 120
    },
    { field: 'status', flex:0.5, headerName: 'Status' }
  ];

  const openOrders = useSelector((state:IRoot) => state.api.openOrders);
  const { data: rows, loading, mutate } = useApi('/api/deposits');

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