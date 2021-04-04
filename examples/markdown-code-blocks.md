# Example

```lilypond
% https://lilypond.org/tiny-examples.html
\version "2.20.0"
\include "english.ly"

\score {
  \new Staff {
    \key d \major
    \numericTimeSignature
    \time 2/4
    <cs' d'' b''>16 <cs' d'' b''>8.
    %% Here: the tie on the D's looks funny
    %% Too tall? Left-hand endpoint is not aligned with the B tie?
    ~
    <cs' d'' b''>8 [ <b d'' a''> ]
  }
}
```

```ly
\version "2.20.0"
{
  % middle tie looks funny here:
  <c' d'' b''>8. ~ <c' d'' b''>8
}
```
