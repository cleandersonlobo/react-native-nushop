import { act, cleanup } from '@testing-library/react-hooks';
import { renderHookApollo } from 'domain/shared/utils/tests-utils';
import { CheckoutMutations, usePurchase } from '../checkout.service';
import { MockPurshaseSuccess } from '../__mocks__/purchase';

const mocks = [
  {
    request: {
      query: CheckoutMutations.purchase,
      variables: { offerId: 'offerId' },
    },
    result: {
      data: MockPurshaseSuccess,
    },
  },
];
describe('Checkout -> usePurchase', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it('renders hook without error', async () => {
    const { result } = renderHookApollo(usePurchase, mocks);

    expect(result.current).toBeTruthy();
  });

  it('should return success when making a successful purchase', async () => {
    const { result } = renderHookApollo(usePurchase, mocks);

    act(() => {
      result.current.purchase({ id: 'offerId' });
    });

    await new Promise(resolve => setTimeout(resolve, 0)); // wait for response

    expect(result.current.data).toEqual(MockPurshaseSuccess);
  });
});
