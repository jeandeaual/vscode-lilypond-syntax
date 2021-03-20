% https://lilypond.org/doc/v2.22/Documentation/extending/lilypond-scheme-syntax
#(begin
  ; this is a single-line comment

  #!
    This a (non-nestable) Guile-style block comment
    But these are rarely used by Schemers and never in
    LilyPond source code
  !#
  (define foo 0)
  (define bar 1))

% https://lilypond.org/doc/v2.22/Documentation/extending/doubling-a-note-with-slurs-_0028example_0029
doubleSlur = #(define-music-function (note) (ly:music?)
         "Return: { note ( note ) }.
         `note' is supposed to be a single note."
         (let ((note2 (ly:music-deep-copy note)))
           (set! (ly:music-property note 'articulations)
                 (cons (make-music 'SlurEvent 'span-direction -1)
                       (ly:music-property note 'articulations)))
           (set! (ly:music-property note2 'articulations)
                 (cons (make-music 'SlurEvent 'span-direction 1)
                       (ly:music-property note2 'articulations)))
           (make-music 'SequentialMusic 'elements (list note note2))))

% https://lilypond.org/doc/v2.22/Documentation/extending/adding-articulation-to-notes-_0028example_0029
addAccent = #(define-music-function (note-event) (ly:music?)
  "Add an accent ArticulationEvent to the articulations of `note-event',
  which is supposed to be a NoteEvent expression."
  (set! (ly:music-property note-event 'articulations)
        (cons (make-music 'ArticulationEvent
                'articulation-type "accent")
              (ly:music-property note-event 'articulations)))
  note-event)

% https://lilypond.org/doc/v2.22/Documentation/extending/displaying-music-expressions
{
  \displayMusic #(open-output-file "display.txt") { c'4\f }
}

% https://lilypond.org/doc/v2.22/Documentation/extending/lilypond-code-blocks
ritpp = #(define-event-function () ()
  #{ ^"rit." \pp #}
)

{ c'4 e'4\ritpp g'2 }

% https://lilypond.org/doc/v2.22/Documentation/extending/difficult-tweaks
#(define (my-callback grob)
   (let* (
          ;; have we been split?
          (orig (ly:grob-original grob))

          ;; if yes, get the split pieces (our siblings)
          (siblings (if (ly:grob? orig)
                        (ly:spanner-broken-into orig)
                        '())))

     (if (and (>= (length siblings) 2)
              (eq? (car (last-pair siblings)) grob))
         (ly:grob-set-property! grob 'extra-offset '(1 . -4)))))

\relative {
  \override Tie.after-line-breaking =
  #my-callback
  c''1 ~ \break
  c2 ~ 2
}
