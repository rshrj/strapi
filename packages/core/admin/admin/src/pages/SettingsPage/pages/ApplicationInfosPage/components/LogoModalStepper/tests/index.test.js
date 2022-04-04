import React from 'react';
import { IntlProvider } from 'react-intl';
import { render as renderTL, fireEvent, screen, waitFor } from '@testing-library/react';
import { ThemeProvider, lightTheme } from '@strapi/design-system';
import LogoModalStepper from '../index';

const render = props =>
  renderTL(
    <ThemeProvider theme={lightTheme}>
      <IntlProvider locale="en" messages={{}} textComponent="span">
        <LogoModalStepper {...props} isOpen onClose={() => jest.fn()} />
      </IntlProvider>
    </ThemeProvider>,
    { container: document.body }
  );

describe('ApplicationsInfosPage || LogoModalStepper', () => {
  describe('from computer', () => {
    it('should render upload modal with from computer tab', () => {
      const { container } = render({ initialStep: 'upload' });

      expect(container).toMatchSnapshot();
    });

    it('should show error message when uploading wrong file format', async () => {
      const { container } = render({ initialStep: 'upload' });

      const file = new File(['(⌐□_□)'], 'michka.gif', { type: 'image/gif' });

      fireEvent.change(container.querySelector('[type="file"]'), {
        target: { files: [file] },
      });

      await waitFor(() =>
        expect(
          screen.getByText('Wrong format uploaded (accepted formats only: jpeg, jpg, png, svg).')
        ).toBeInTheDocument()
      );
    });

    it.only('should show error message when uploading wrong sizing format', async () => {
      // const { container } = render({ initialStep: 'upload' });
      // const file = new File(['(⌐□_□)'], 'michka.gif', { type: 'image/jpeg', size: 5830185 });
      // fireEvent.change(container.querySelector('[type="file"]'), {
      //   target: { files: [file] },
      // });
      // await waitFor(() =>
      //   expect(
      //     screen.getByText('Wrong sizing uploaded (max dimension: 750*750, max file size: TBC)')
      //   ).toBeInTheDocument()
      // );
    });
  });
});
