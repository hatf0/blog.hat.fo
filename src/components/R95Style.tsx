import { createGlobalStyle } from '@xstyled/styled-components';

// @ts-ignore
import eot from '@react95/core/esm/GlobalStyle/font/MS-Sans-Serif.eot';
// @ts-ignore
import ttf from '@react95/core/esm/GlobalStyle/font/MS-Sans-Serif.ttf';
// @ts-ignore
import woff from '@react95/core/esm/GlobalStyle/font/MS-Sans-Serif.woff';
// @ts-ignore
import woff2 from '@react95/core/esm/GlobalStyle/font/MS-Sans-Serif.woff2';
// @ts-ignore
import videoeot from '@react95/core/esm/GlobalStyle/font/React95Video-Numbers.eot';
// @ts-ignore
import videottf from '@react95/core/esm/GlobalStyle/font/React95Video-Numbers.ttf';
// @ts-ignore
import videowoff from '@react95/core/esm/GlobalStyle/font/React95Video-Numbers.woff';
// @ts-ignore
import videowoff2 from '@react95/core/esm/GlobalStyle/font/React95Video-Numbers.woff2';
// @ts-ignore
import Cursor from '@react95/core/esm/Cursor/Cursor';
// @ts-ignore
import { scrollbars } from '@react95/core/esm/GlobalStyle/Scrollbar';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'MS Sans Serif';
    src: url('${eot}');
    src: url('${woff2}') format('woff2'),
         url('${woff}') format('woff'),
         url('${ttf}') format('truetype'),
         url('${eot}?#iefix') format('embedded-opentype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'React95Video-Numbers';
    src: url('${videoeot}');
    src: url('${videowoff2}') format('woff2'),
         url('${videowoff}') format('woff'),
         url('${videottf}') format('truetype'),
         url('${videoeot}?#iefix') format('embedded-opentype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    background-color: #5aa;
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: materialText;
    overflow: hidden;

    :not(.aaaaaa-i-hate-this-hack-but-this-allows-me-to-overwrite-the-font-family-and-let-it-inherit-so-it-shall-stay *) {
      font-family: 'MS Sans Serif';
      box-sizing: border-box;
    }
  }

  // scrollbar
  ${scrollbars}

  html, .auto, body:not(.disable-r95 *)  { ${Cursor.Auto} }
  .default             { ${Cursor.Auto} }
  .none                { ${Cursor.None} }
  .help                { ${Cursor.Help} }
  .pointer, :any-link  { ${Cursor.Pointer} }
  .progress            { ${Cursor.Progress} }
  .wait                { ${Cursor.Wait} }
  .crosshair           { ${Cursor.Crosshair} }
  .text                { ${Cursor.Text} }
  .vertical-text       { ${Cursor.VerticalText} }
  .alias               { ${Cursor.Alias} }
  .copy                { ${Cursor.Copy} }
  .move                { ${Cursor.Move} }
  .no-drop             { ${Cursor.NoDrop} }
  .not-allowed         { ${Cursor.NotAllowed} }
  .grab                { ${Cursor.Grab} }
  .grabbing            { ${Cursor.Grabbing} }
  .col-resize          { ${Cursor.ColResize} }
  .row-resize          { ${Cursor.RowResize} }
  .n-resize            { ${Cursor.NResize} }
  .e-resize            { ${Cursor.EResize} }
  .s-resize            { ${Cursor.SResize} }
  .w-resize            { ${Cursor.WResize} }
  .ns-resize           { ${Cursor.NsResize} }
  .ew-resize           { ${Cursor.EwResize} }
  .ne-resize           { ${Cursor.NeResize} }
  .nw-resize           { ${Cursor.NwResize} }
  .se-resize           { ${Cursor.SeResize} }
  .sw-resize           { ${Cursor.SwResize} }
  .nesw-resize         { ${Cursor.NeswResize} }
  .nwse-resize         { ${Cursor.NwseResize} }
  .zoom-in             { ${Cursor.ZoomIn} }
  .zoom-out            { ${Cursor.ZoomOut} }
`;

export default GlobalStyle;
