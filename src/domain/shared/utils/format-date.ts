import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const formatHistoryDate = (
  dateString?: string,
  formatType = 'dd MMM',
) => {
  if (!dateString) return '';
  return format(new Date(dateString), formatType, {
    locale: ptBR,
  }).toUpperCase();
};
