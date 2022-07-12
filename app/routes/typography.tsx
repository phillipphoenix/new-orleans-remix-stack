import { Link } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/atoms/buttons/Button";
import { Typography } from "~/atoms/Typography";
import { Card } from "~/components/cards/Card";
import { CardBody } from "~/components/cards/CardBody";
import { CardFooter } from "~/components/cards/CardFooter";
import { CardHeader } from "~/components/cards/CardHeader";

export default function TypographyPage() {
  const [isShowingLongHeadings, setIsShowingLongHeadings] =
    useState<boolean>(false);

  return (
    <div className=" h-screen bg-gradient-to-br from-indigo-700 via-purple-800 to-pink-900">
      <div className="container mx-auto px-4 py-20">
        <Card>
          <CardHeader>
            <Typography variant="h1" className="">
              Typography for this template
            </Typography>
            <Typography>
              The styles can be changed in the Typography atom (component).
            </Typography>
          </CardHeader>
          <CardBody>
            <Button
              type="button"
              onClick={() => setIsShowingLongHeadings((curVal) => !curVal)}
            >
              {isShowingLongHeadings ? "Hide" : "Show"} long headings
            </Button>
            <Typography variant="h1" className="">
              Heading 1{" "}
              {isShowingLongHeadings &&
                " - but much longer so that it will wrap around so we can see that the line height is also fine."}
            </Typography>
            <Typography variant="h2" className="">
              Heading 2{" "}
              {isShowingLongHeadings &&
                " - but much longer so that it will wrap around so we can see that the line height is also fine. And longer again since this font size is smaller."}
            </Typography>
            <Typography variant="h3" className="">
              Heading 3{" "}
              {isShowingLongHeadings &&
                " - but much longer so that it will wrap around so we can see that the line height is also fine. And longer again since this font size is smaller. And longer still."}
            </Typography>
            <Typography variant="h4" className="">
              Heading 4{" "}
              {isShowingLongHeadings &&
                " - but much longer so that it will wrap around so we can see that the line height is also fine. And longer again since this font size is smaller. And longer still. This is getting really ridiculous as we don't want to write so much text."}
            </Typography>
            <Typography variant="h5" className="">
              Heading 5{" "}
              {isShowingLongHeadings &&
                " - but much longer so that it will wrap around so we can see that the line height is also fine. And longer again since this font size is smaller. And longer still. This is getting really ridiculous as we don't want to write so much text. Wow... Now the font size just gets incredibly small. It is becoming hard to see that this is a heading."}
            </Typography>
            <Typography variant="h6" className="">
              Heading 6{" "}
              {isShowingLongHeadings &&
                " - but much longer so that it will wrap around so we can see that the line height is also fine. And longer again since this font size is smaller. And longer still. This is getting really ridiculous as we don't want to write so much text. Wow... Now the font size just gets incredibly small. It is becoming hard to see that this is a heading."}
            </Typography>
            <Typography variant="lead" className="">
              Leading text or subtitle{" "}
              {isShowingLongHeadings &&
                " - but much longer so that it will wrap around so we can see that the line height is also fine. And longer again since this font size is smaller. And longer still. This is getting really ridiculous as we don't want to write so much text. Wow... Now the font size just gets incredibly small. It is becoming hard to see that this is a heading."}
            </Typography>
            <br />
            <br />
            <Typography>Normal paragraph text:</Typography>
            <Typography className="">
              The quick, brown fox jumps over a lazy dog. DJs flock by when MTV
              ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick
              quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox
              nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox.
              Bright vixens jump; dozy fowl quack.
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
