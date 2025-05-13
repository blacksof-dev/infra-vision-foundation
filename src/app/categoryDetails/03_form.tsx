import { UnderlineWithHover } from "@/_components/atoms/buttons";
import { Checkbox } from "@/_components/ui/checkbox";
import { Input } from "@/_components/ui/input";
import { Textarea } from "@/_components/ui/textarea";


export default function CategoryDetailForm() {
  return (
    <>
      <div>
        <div className="">
          <h3 className="text-darkgray font-medium py-3">Comments</h3>
          <p className="text-darkgray font-light">
            No comments yet. Why don’t you start the discussion?
          </p>
        </div>
        <div>
          <h3 className="text-darkgray font-medium py-3">Leave a Reply</h3>
          <p className="text-darkgray font-light">
            Your email address will not be published. Required fields are marked
            *
          </p>
          <div>
            <form className="py-7">
              {/* TextArea to drop a message */}
              <div>
                <Textarea id="comment" placeholder="Write a comment... " />
              </div>
              <div>
                <div className="flex gap-3 md:gap-4  w-full pt-6">
                  <div className="w-full">
                    <Input id="fullName" type="text" placeholder="Full name*" />
                  </div>
                  <div className="w-full">
                    <Input id="email" type="email" placeholder="Email*" />
                  </div>
                  <div className="w-full">
                    <Input id="website" type="text" placeholder="website" />
                  </div>
                </div>
                <div className="pt-6">
                  <div className="flex gap-2 py-2">
                    <Checkbox     
                      className="w-5 h-5 rounded border border-pink"
                    />
                    <p>
                      Save my name, email, and website in this browser for the
                      next time I comment.
                    </p>
                  </div>
                  <div className="flex gap-2 py-2">
                    <Checkbox
                      className="w-5 h-5 rounded border border-pink"
                    />
                    <p>Receive news updates via email from this site</p>
                  </div>
                </div>
              </div>
              <div className="py-4">
                <UnderlineWithHover
                  size="small"
                  color="pink"
                  bgColor="pink"
                  text="Post Comment"
                  role="button"
                  borderColor="white"
                />
              </div>
            </form>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
