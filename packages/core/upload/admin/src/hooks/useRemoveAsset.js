import { useMutation, useQueryClient } from 'react-query';
import { useNotification } from '@strapi/helper-plugin';

import pluginId from '../pluginId';
import { removeAssetRequest } from '../utils/removeAssetQuery';

export const useRemoveAsset = onSuccess => {
  const toggleNotification = useNotification();
  const queryClient = useQueryClient();

  const mutation = useMutation(assetId => removeAssetRequest(assetId), {
    onSuccess: () => {
      // Coupled with the cache of useAssets
      queryClient.refetchQueries([pluginId, 'assets'], { active: true });
      queryClient.refetchQueries([pluginId, 'asset-count'], { active: true });

      toggleNotification({
        type: 'success',
        message: {
          id: 'modal.remove.success-label',
          defaultMessage: 'The asset has been successfully removed.',
        },
      });

      onSuccess();
    },
    onError: error => {
      toggleNotification({ type: 'warning', message: error.message });
    },
  });

  const removeAsset = assetId => mutation.mutate(assetId);

  return { ...mutation, removeAsset };
};
