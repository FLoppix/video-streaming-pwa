import { css } from 'styled-components';

export const sizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  phone: 376,
};

export const media = {
  mobile: (...args) => css`
    @media (max-width: 767px) {
      ${css(...args)};
    }
  `,
};
