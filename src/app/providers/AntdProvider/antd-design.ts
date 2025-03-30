import type { ThemeConfig } from "antd";

export const lightThemeConfig: ThemeConfig = {
   token: {
      colorText: '#000',
      colorBgBase: '#fff',
      colorLink: '#1890ff',
      colorBorder: '#d9d9d9',
      colorPrimaryHover: '#e24242',
      colorPrimaryActive: '#DE6263',
      colorPrimary: '#DE6263',
   },
   components: {
      Button: {
         controlOutline: 'none',
         defaultBorderColor: 'transparent',
      },
      Input: {
         paddingInline: 15,
         paddingBlock: 10,
         borderRadius: 12,
         fontSize: 16,
      },
      Card: {
         bodyPadding: 0,
         colorBgContainer: '#72727209',
      },
      Carousel: {
         marginXXS: 8
      },
      Modal: {
         colorBgMask: 'rgba(231, 244, 255, 0.863);',
      }
   },
};


export const darkThemeConfig: ThemeConfig = {
   token: {
      colorText: '#fff',
      colorBgBase: '#141414',
      colorLink: '#1890ff',
      colorBorder: '#333',
      colorPrimaryHover: '#962c2c',
      colorPrimaryActive: '#DE6263',
      colorPrimary: '#962c2c',
      colorBorderBg: '#000',
   },
   components: {
      Button: {
         controlOutline: 'none',
         defaultBorderColor: 'transparent',
         colorPrimary: '#bb3637',
      },
      Input: {
         activeShadow: 'none',
         colorTextPlaceholder: '#ababab',
         paddingInline: 15,
         paddingBlock: 10,
         borderRadius: 12,
         fontSize: 16,
         controlHeight: 40
      },
      Card: {
         colorBgContainer: '#212124',
         bodyPadding: 0
      },
      Carousel: {
         marginXXS: 8
      },
      Modal: {
         colorBgMask: '#020200ee',
      }
   },
};

