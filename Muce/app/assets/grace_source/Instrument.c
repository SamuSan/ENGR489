#include <gracelib.h>
#include <stdlib.h>
static char compilerRevision[] = "e33f3452d00ddf38a32b640a4945c512ba51b206";
static Object undefined;
extern Object done;
extern Object _prelude;
extern Object String;
extern Object Number;
extern Object Boolean;
extern Object Dynamic;
extern Object Unknown;
extern Object List;
extern Object Block;
extern Object Done;
extern Object Type;
extern Object GraceDefaultObject;
extern Object sourceObject;
static Object type_String;
static Object type_Number;
static Object type_Boolean;
static Object type_Block;
static Object type_Done;
static Object argv;
static Object emptyclosure;
static Object prelude;
static int isTailObject = 0;
static Object inheritingObject = NULL;
static const char modulename[] = "Instrument";
Object module_StandardPrelude_init();
Object module_imports_init();
static char *originalSourceLines[] = {
  "class Instrument.name(name'){",
  "  def name is readable = name'",
  "",
  "  method name {",
  "    ",
  "  }",
  "}",
  NULL
};
Object reader_Instrument_outer_2(Object self, int nparams, int *argcv, Object* args, int flags) {
  struct UserObject *uo = (struct UserObject*)self;
  return uo->data[0];
}
Object reader_Instrument_outer_5(Object self, int nparams, int *argcv, Object* args, int flags) {
  struct UserObject *uo = (struct UserObject*)self;
  return uo->data[0];
}
Object reader_Instrument_name_6(Object self, int nparams, int *argcv, Object* args, int flags) {
  struct UserObject *uo = (struct UserObject *)self;
  return uo->data[1];
}
static ClassData objclass1;
static ClassData objclass4;
Object meth_Instrument_Instrument0(Object self, int nparts, int *argcv, Object *args, int32_t flags) {
  struct UserObject *uo = (struct UserObject*)self;
  Object closure = getdatum((Object)uo, 1, (flags>>24)&0xff);
  struct StackFrameObject *stackframe = alloc_StackFrame(1, getclosureframe(closure));
  pushclosure(closure);
  pushstackframe(stackframe, "Instrument");
  int frame = gc_frame_new();
  gc_frame_newslot((Object)stackframe);
  Object methodInheritingObject = NULL;
  Object params[1];
  int partcv[1];
  Object *var_Instrument = getfromclosure(closure, 0);
  int i;
  int curarg = 0;
  int pushcv[] = {1};
  if (nparts < 1 && args)
    gracedie("missing argument list for Instrument (probably reflection error): got %i lists, expected 1.", nparts);
if (argcv && argcv[0] > 0)
  gracedie("too many arguments for Instrument");
  Object *selfslot = &(stackframe->slots[0]);
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  if (methodInheritingObject) curarg++;
// Begin line 1
  setline(1);
  setmodule(modulename);
  setsource(originalSourceLines);
// compilenode returning *var_Instrument
  gc_frame_end(frame);
  return *var_Instrument;
}
Object meth_Instrument_name7(Object self, int nparts, int *argcv, Object *args, int32_t flags) {
  struct StackFrameObject *stackframe = alloc_StackFrame(1, NULL);
  pushclosure(NULL);
  pushstackframe(stackframe, "name");
  int frame = gc_frame_new();
  gc_frame_newslot((Object)stackframe);
  Object methodInheritingObject = NULL;
  Object params[1];
  int partcv[1];
  int i;
  int curarg = 0;
  int pushcv[] = {1};
  if (nparts < 1 && args)
    gracedie("missing argument list for name (probably reflection error): got %i lists, expected 1.", nparts);
if (argcv && argcv[0] > 0)
  gracedie("too many arguments for name");
  Object *selfslot = &(stackframe->slots[0]);
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  if (methodInheritingObject) curarg++;
  gc_frame_end(frame);
  return done;
}
Object meth_Instrument_name3(Object self, int nparts, int *argcv, Object *args, int32_t flags) {
  struct StackFrameObject *stackframe = alloc_StackFrame(2, NULL);
  pushclosure(NULL);
  pushstackframe(stackframe, "name");
  int frame = gc_frame_new();
  gc_frame_newslot((Object)stackframe);
  Object methodInheritingObject = NULL;
  if (nparts > 0 && argcv[0] < 1)
    gracedie("insufficient arguments to method");
  Object params[1];
  int partcv[1];
  int i;
  int curarg = 0;
  int pushcv[] = {1};
  if (nparts < 1 && args)
    gracedie("missing argument list for name (probably reflection error): got %i lists, expected 1.", nparts);
  Object *var_name_39_ = &(stackframe->slots[0]);
  *var_name_39_ = args[curarg];
  curarg++;
if (argcv && argcv[0] > 1)
  gracedie("too many arguments for name");
  Object *selfslot = &(stackframe->slots[1]);
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  if (methodInheritingObject) curarg++;
  isTailObject = 1;
  inheritingObject = methodInheritingObject;
  Object inheritingObject4 = inheritingObject;
  if (isTailObject) {
    isTailObject = 0;
    inheritingObject = NULL;
  }
  Object obj4 = alloc_userobj3(2, 4, 0, objclass4);
  gc_frame_newslot(obj4);
if (objclass4 == NULL) {
  glfree(obj4->class->name);
  obj4->class->name = "Instrument";
}
// OBJECT OUTER DEC outer
  adddatum2(obj4, self, 0);
  addmethodreal(obj4,"outer", &reader_Instrument_outer_5);
  Object oldself4 = self;
  struct StackFrameObject *oldstackframe4 = stackframe;
  stackframe = alloc_StackFrame(1, oldstackframe4);
  gc_frame_newslot((Object)stackframe);
  self = obj4;
  Object *oldselfslot4 = selfslot;
  selfslot = &stackframe->slots[0];
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  Object thisouter4 = (*(struct UserObject *)self).data[0], lowerouter4 = thisouter4;
  if (inheritingObject4) {
    struct UserObject *inho4 = (struct UserObject *)inheritingObject4;
    while (inho4->super != GraceDefaultObject) inho4 = (struct UserObject *)inho4->super;
    inho4->super = obj4;
    self = inheritingObject4;
    *selfslot = self;
    lowerouter4 = (*(struct UserObject *)self).data[0];
    (*(struct UserObject *)self).data[0] = thisouter4;
  }
if (objclass4 == NULL) {
  Method *reader6 = addmethodrealflags(obj4, "name",&reader_Instrument_name_6, MFLAG_DEF);
  reader6->definitionModule = modulename;
  reader6->definitionLine = 4;
}
adddatum2(obj4, alloc_Undefined(), 1);
  struct UserObject *uo7 = (struct UserObject*)obj4;
  uo7->data[2] = emptyclosure;
  Method *meth_meth_Instrument_name7 = addmethod2pos(obj4, "name", &meth_Instrument_name7, 2);
int argcv_meth_Instrument_name7[] = {0};
meth_meth_Instrument_name7->type = alloc_MethodType(1, argcv_meth_Instrument_name7);
  meth_meth_Instrument_name7->definitionModule = modulename;
  meth_meth_Instrument_name7->definitionLine = 4;
  sourceObject = obj4;
// Begin line 2
  setline(2);
  setmodule(modulename);
  setsource(originalSourceLines);
// compilenode returning *var_name_39_
  adddatum2(obj4, *var_name_39_, 1);
  sourceObject = obj4;
objclass4 = obj4->class;
  objclass4->definitionModule = modulename;
  objclass4->definitionLine = 4;
  (*(struct UserObject *)self).data[0] = lowerouter4;
  self = oldself4;
  selfslot = oldselfslot4;
  stackframe = oldstackframe4;
  gc_frame_end(frame);
  return obj4;
}
Object meth_Instrument_name3_object(Object self, int nparts, int *argcv, Object *args, int32_t flags) {
  struct StackFrameObject *stackframe = alloc_StackFrame(2, NULL);
  pushclosure(NULL);
  pushstackframe(stackframe, "name()object");
  int frame = gc_frame_new();
  gc_frame_newslot((Object)stackframe);
  Object methodInheritingObject = args[0 + argcv[0]];
  if (nparts > 0 && argcv[0] < 1)
    gracedie("insufficient arguments to method");
  Object params[1];
  int partcv[1];
  int i;
  int curarg = 0;
  int pushcv[] = {1};
  if (nparts < 1 && args)
    gracedie("missing argument list for name (probably reflection error): got %i lists, expected 1.", nparts);
  Object *var_name_39_ = &(stackframe->slots[0]);
  *var_name_39_ = args[curarg];
  curarg++;
if (argcv && argcv[0] > 1)
  gracedie("too many arguments for name");
  Object *selfslot = &(stackframe->slots[1]);
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  if (methodInheritingObject) curarg++;
  isTailObject = 1;
  inheritingObject = methodInheritingObject;
  Object inheritingObject4 = inheritingObject;
  if (isTailObject) {
    isTailObject = 0;
    inheritingObject = NULL;
  }
  Object obj4 = alloc_userobj3(2, 4, 0, objclass4);
  gc_frame_newslot(obj4);
if (objclass4 == NULL) {
  glfree(obj4->class->name);
  obj4->class->name = "Instrument";
}
// OBJECT OUTER DEC outer
  adddatum2(obj4, self, 0);
  addmethodreal(obj4,"outer", &reader_Instrument_outer_5);
  Object oldself4 = self;
  struct StackFrameObject *oldstackframe4 = stackframe;
  stackframe = alloc_StackFrame(1, oldstackframe4);
  gc_frame_newslot((Object)stackframe);
  self = obj4;
  Object *oldselfslot4 = selfslot;
  selfslot = &stackframe->slots[0];
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  Object thisouter4 = (*(struct UserObject *)self).data[0], lowerouter4 = thisouter4;
  if (inheritingObject4) {
    struct UserObject *inho4 = (struct UserObject *)inheritingObject4;
    while (inho4->super != GraceDefaultObject) inho4 = (struct UserObject *)inho4->super;
    inho4->super = obj4;
    self = inheritingObject4;
    *selfslot = self;
    lowerouter4 = (*(struct UserObject *)self).data[0];
    (*(struct UserObject *)self).data[0] = thisouter4;
  }
if (objclass4 == NULL) {
  Method *reader6 = addmethodrealflags(obj4, "name",&reader_Instrument_name_6, MFLAG_DEF);
  reader6->definitionModule = modulename;
  reader6->definitionLine = 4;
}
adddatum2(obj4, alloc_Undefined(), 1);
  struct UserObject *uo7 = (struct UserObject*)obj4;
  uo7->data[2] = emptyclosure;
  Method *meth_meth_Instrument_name7 = addmethod2pos(obj4, "name", &meth_Instrument_name7, 2);
int argcv_meth_Instrument_name7[] = {0};
meth_meth_Instrument_name7->type = alloc_MethodType(1, argcv_meth_Instrument_name7);
  meth_meth_Instrument_name7->definitionModule = modulename;
  meth_meth_Instrument_name7->definitionLine = 4;
  sourceObject = obj4;
// Begin line 2
  setline(2);
  setmodule(modulename);
  setsource(originalSourceLines);
// compilenode returning *var_name_39_
  adddatum2(obj4, *var_name_39_, 1);
  sourceObject = obj4;
objclass4 = obj4->class;
  objclass4->definitionModule = modulename;
  objclass4->definitionLine = 4;
  (*(struct UserObject *)self).data[0] = lowerouter4;
  self = oldself4;
  selfslot = oldselfslot4;
  stackframe = oldstackframe4;
  gc_frame_end(frame);
  return obj4;
}
Object module_Instrument_init() {
  int flags = 0;
  int frame = gc_frame_new();
  Object self = alloc_obj2(3, 3);
  self->class->definitionModule = modulename;
  gc_root(self);
  prelude = module_StandardPrelude_init();
  adddatum2(self, prelude, 0);
  addmethod2(self, "outer", &grace_userobj_outer);
  setline(1);
  setmodule(modulename);
  setsource(originalSourceLines);
  setclassname(self, "Module<Instrument>");
  Object *var_MatchFailed = alloc_var();
  *var_MatchFailed = alloc_MatchFailed();
  Object *var_noSuchValue = alloc_var();
  *var_noSuchValue = done;
  Object *var_done = alloc_var();
  *var_done = done;
  Object *var_String = alloc_var();
  *var_String = String;
  type_String = String;
  Object *var_Block = alloc_var();
  *var_Block = Block;
  type_Block = Block;
  Object *var_Done = alloc_var();
  *var_Done = Done;
  type_Done = Done;
  Object *var_Number = alloc_var();
  *var_Number = Number;
  type_Number = Number;
  Object *var_Boolean = alloc_var();
  *var_Boolean = Boolean;
  type_Boolean = Boolean;
  Object *var_Dynamic = alloc_var();
  *var_Dynamic = Dynamic;
  Object *var_Unknown = alloc_var();
  *var_Unknown= Unknown;
  Object *var_List = alloc_var();
  *var_List = List;
  Object *var_Type = alloc_var();
  *var_Type = Type;
  Object *var__prelude = alloc_var();
  *var__prelude = grace_prelude();
  gc_root(*var_MatchFailed);
  emptyclosure = createclosure(0, "empty");
  gc_root(emptyclosure);
  struct StackFrameObject *stackframe = alloc_StackFrame(3, NULL);
  gc_root((Object)stackframe);
  pushstackframe(stackframe, "module scope");
  Object *selfslot = &(stackframe->slots[0]);
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  Object params[1];
  int partcv[1];
  Object *var_Instrument = &(stackframe->slots[1]);
  setframeelementname(stackframe, 1, "Instrument");
// Begin line 4
  setline(4);
  setmodule(modulename);
  setsource(originalSourceLines);
  block_savedest(self);
  Object closure0 = createclosure(1, "Instrument");
setclosureframe(closure0, stackframe);
  addtoclosure(closure0, var_Instrument);
  struct UserObject *uo0 = (struct UserObject*)self;
  uo0->data[1] = (Object)closure0;
  Method *meth_meth_Instrument_Instrument0 = addmethod2pos(self, "Instrument", &meth_Instrument_Instrument0, 1);
int argcv_meth_Instrument_Instrument0[] = {0};
meth_meth_Instrument_Instrument0->type = alloc_MethodType(1, argcv_meth_Instrument_Instrument0);
  meth_meth_Instrument_Instrument0->definitionModule = modulename;
  meth_meth_Instrument_Instrument0->definitionLine = 4;
// compilenode returning 
// Begin line 4
  setline(4);
  setmodule(modulename);
  setsource(originalSourceLines);
  Object inheritingObject1 = inheritingObject;
  if (isTailObject) {
    isTailObject = 0;
    inheritingObject = NULL;
  }
  Object obj1 = alloc_userobj3(2, 4, 0, objclass1);
  gc_frame_newslot(obj1);
// OBJECT OUTER DEC outer
  adddatum2(obj1, self, 0);
  addmethodreal(obj1,"outer", &reader_Instrument_outer_2);
  Object oldself1 = self;
  struct StackFrameObject *oldstackframe1 = stackframe;
  stackframe = alloc_StackFrame(1, oldstackframe1);
  gc_frame_newslot((Object)stackframe);
  self = obj1;
  Object *oldselfslot1 = selfslot;
  selfslot = &stackframe->slots[0];
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  Object thisouter1 = (*(struct UserObject *)self).data[0], lowerouter1 = thisouter1;
  if (inheritingObject1) {
    struct UserObject *inho1 = (struct UserObject *)inheritingObject1;
    while (inho1->super != GraceDefaultObject) inho1 = (struct UserObject *)inho1->super;
    inho1->super = obj1;
    self = inheritingObject1;
    *selfslot = self;
    lowerouter1 = (*(struct UserObject *)self).data[0];
    (*(struct UserObject *)self).data[0] = thisouter1;
  }
  struct UserObject *uo3 = (struct UserObject*)obj1;
  uo3->data[1] = emptyclosure;
  Method *meth_meth_Instrument_name3 = addmethod2pos(obj1, "name", &meth_Instrument_name3, 1);
int argcv_meth_Instrument_name3[] = {1};
meth_meth_Instrument_name3->type = alloc_MethodType(1, argcv_meth_Instrument_name3);
  meth_meth_Instrument_name3->definitionModule = modulename;
  meth_meth_Instrument_name3->definitionLine = 4;
  Method *meth_meth_Instrument_name3_object = addmethod2pos(obj1, "name()object", &meth_Instrument_name3_object, 1);
int argcv_meth_Instrument_name3_object[] = {1};
meth_meth_Instrument_name3_object->type = alloc_MethodType(1, argcv_meth_Instrument_name3_object);
  meth_meth_Instrument_name3_object->definitionModule = modulename;
  meth_meth_Instrument_name3_object->definitionLine = 4;
  sourceObject = obj1;
objclass1 = obj1->class;
  objclass1->definitionModule = modulename;
  objclass1->definitionLine = 4;
  (*(struct UserObject *)self).data[0] = lowerouter1;
  self = oldself1;
  selfslot = oldselfslot1;
  stackframe = oldstackframe1;
// compilenode returning obj1
  *var_Instrument = obj1;
  if (obj1 == undefined)
    callmethod(done, "assignment", 0, NULL, NULL);
// compilenode returning done
// compilenode returning done
  gc_frame_end(frame);
  return self;
}
