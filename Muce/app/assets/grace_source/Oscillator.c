#include <gracelib.h>
#include <stdlib.h>
#ifndef __CYGWIN__
#pragma weak main
#endif
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
static const char modulename[] = "Oscillator";
Object module_StandardPrelude_init();
Object module_imports_init();
static char *originalSourceLines[] = {
  "class Oscillator.wave(wave') {",
  "  var wave := wave'",
  "",
  "  method play (){",
  "    return \"playing\"",
  "  }",
  "}",
  "",
  "var o := Oscillator.wave(\"sine\")",
  "print (o.play())",
  NULL
};
Object reader_Oscillator_outer_2(Object self, int nparams, int *argcv, Object* args, int flags) {
  struct UserObject *uo = (struct UserObject*)self;
  return uo->data[0];
}
Object reader_Oscillator_outer_5(Object self, int nparams, int *argcv, Object* args, int flags) {
  struct UserObject *uo = (struct UserObject*)self;
  return uo->data[0];
}
Object reader_Oscillator_wave_6(Object self, int nparams, int *argcv, Object* args, int flags) {
  struct UserObject *uo = (struct UserObject *)self;
  return uo->data[1];
}
Object writer_Oscillator_wave_6(Object self, int nparams, int *argcv, Object* args, int flags) {
  struct UserObject *uo = (struct UserObject *)self;
  uo->data[1] = args[0];
  return done;
}
static ClassData objclass1;
static ClassData objclass4;
static Object strlit8;
static Object strlit11;
Object meth_Oscillator_Oscillator0(Object self, int nparts, int *argcv, Object *args, int32_t flags) {
  struct UserObject *uo = (struct UserObject*)self;
  Object closure = getdatum((Object)uo, 1, (flags>>24)&0xff);
  struct StackFrameObject *stackframe = alloc_StackFrame(1, getclosureframe(closure));
  pushclosure(closure);
  pushstackframe(stackframe, "Oscillator");
  int frame = gc_frame_new();
  gc_frame_newslot((Object)stackframe);
  Object methodInheritingObject = NULL;
  Object params[1];
  int partcv[1];
  Object *var_Oscillator = getfromclosure(closure, 0);
  int i;
  int curarg = 0;
  int pushcv[] = {1};
  if (nparts < 1 && args)
    gracedie("missing argument list for Oscillator (probably reflection error): got %i lists, expected 1.", nparts);
if (argcv && argcv[0] > 0)
  gracedie("too many arguments for Oscillator");
  Object *selfslot = &(stackframe->slots[0]);
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  if (methodInheritingObject) curarg++;
// Begin line 1
  setline(1);
  setmodule(modulename);
  setsource(originalSourceLines);
// compilenode returning *var_Oscillator
  gc_frame_end(frame);
  return *var_Oscillator;
}
Object meth_Oscillator_play7(Object self, int nparts, int *argcv, Object *args, int32_t flags) {
  struct StackFrameObject *stackframe = alloc_StackFrame(1, NULL);
  pushclosure(NULL);
  pushstackframe(stackframe, "play");
  int frame = gc_frame_new();
  gc_frame_newslot((Object)stackframe);
  Object methodInheritingObject = NULL;
  Object params[1];
  int partcv[1];
  int i;
  int curarg = 0;
  int pushcv[] = {1};
  if (nparts < 1 && args)
    gracedie("missing argument list for play (probably reflection error): got %i lists, expected 1.", nparts);
if (argcv && argcv[0] > 0)
  gracedie("too many arguments for play");
  Object *selfslot = &(stackframe->slots[0]);
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  if (methodInheritingObject) curarg++;
// Begin line 6
  setline(6);
  setmodule(modulename);
  setsource(originalSourceLines);
// Begin line 5
  setline(5);
  setmodule(modulename);
  setsource(originalSourceLines);
  if (strlit8 == NULL) {
    strlit8 = alloc_String("playing");
    gc_root(strlit8);
  }
// compilenode returning strlit8
  return strlit8;
// compilenode returning undefined
  gc_frame_end(frame);
  return undefined;
}
Object meth_Oscillator_wave3(Object self, int nparts, int *argcv, Object *args, int32_t flags) {
  struct StackFrameObject *stackframe = alloc_StackFrame(2, NULL);
  pushclosure(NULL);
  pushstackframe(stackframe, "wave");
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
    gracedie("missing argument list for wave (probably reflection error): got %i lists, expected 1.", nparts);
  Object *var_wave_39_ = &(stackframe->slots[0]);
  *var_wave_39_ = args[curarg];
  curarg++;
if (argcv && argcv[0] > 1)
  gracedie("too many arguments for wave");
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
  Object obj4 = alloc_userobj3(3, 4, 0, objclass4);
  gc_frame_newslot(obj4);
if (objclass4 == NULL) {
  glfree(obj4->class->name);
  obj4->class->name = "Oscillator";
}
// OBJECT OUTER DEC outer
  adddatum2(obj4, self, 0);
  addmethodreal(obj4,"outer", &reader_Oscillator_outer_5);
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
  Method *reader6 = addmethodrealflags(obj4, "wave",&reader_Oscillator_wave_6, MFLAG_CONFIDENTIAL);
  Method *writer6 = addmethodrealflags(obj4, "wave:=",&writer_Oscillator_wave_6, MFLAG_CONFIDENTIAL);
  reader6->definitionModule = modulename;
  writer6->definitionModule = modulename;
  reader6->definitionLine = 4;
  writer6->definitionLine = 4;
}
obj4->flags |= OFLAG_MUTABLE;
adddatum2(obj4, alloc_Undefined(), 1);
  struct UserObject *uo7 = (struct UserObject*)obj4;
  uo7->data[2] = emptyclosure;
  Method *meth_meth_Oscillator_play7 = addmethod2pos(obj4, "play", &meth_Oscillator_play7, 2);
int argcv_meth_Oscillator_play7[] = {0};
meth_meth_Oscillator_play7->type = alloc_MethodType(1, argcv_meth_Oscillator_play7);
  meth_meth_Oscillator_play7->definitionModule = modulename;
  meth_meth_Oscillator_play7->definitionLine = 4;
  sourceObject = obj4;
// Begin line 2
  setline(2);
  setmodule(modulename);
  setsource(originalSourceLines);
// compilenode returning *var_wave_39_
  adddatum2(obj4, *var_wave_39_, 1);
  sourceObject = obj4;
objclass4 = obj4->class;
  objclass4->definitionModule = modulename;
  objclass4->definitionLine = 10;
  (*(struct UserObject *)self).data[0] = lowerouter4;
  self = oldself4;
  selfslot = oldselfslot4;
  stackframe = oldstackframe4;
  gc_frame_end(frame);
  return obj4;
}
Object meth_Oscillator_wave3_object(Object self, int nparts, int *argcv, Object *args, int32_t flags) {
  struct StackFrameObject *stackframe = alloc_StackFrame(2, NULL);
  pushclosure(NULL);
  pushstackframe(stackframe, "wave()object");
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
    gracedie("missing argument list for wave (probably reflection error): got %i lists, expected 1.", nparts);
  Object *var_wave_39_ = &(stackframe->slots[0]);
  *var_wave_39_ = args[curarg];
  curarg++;
if (argcv && argcv[0] > 1)
  gracedie("too many arguments for wave");
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
  Object obj4 = alloc_userobj3(3, 4, 0, objclass4);
  gc_frame_newslot(obj4);
if (objclass4 == NULL) {
  glfree(obj4->class->name);
  obj4->class->name = "Oscillator";
}
// OBJECT OUTER DEC outer
  adddatum2(obj4, self, 0);
  addmethodreal(obj4,"outer", &reader_Oscillator_outer_5);
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
  Method *reader6 = addmethodrealflags(obj4, "wave",&reader_Oscillator_wave_6, MFLAG_CONFIDENTIAL);
  Method *writer6 = addmethodrealflags(obj4, "wave:=",&writer_Oscillator_wave_6, MFLAG_CONFIDENTIAL);
  reader6->definitionModule = modulename;
  writer6->definitionModule = modulename;
  reader6->definitionLine = 4;
  writer6->definitionLine = 4;
}
obj4->flags |= OFLAG_MUTABLE;
adddatum2(obj4, alloc_Undefined(), 1);
  struct UserObject *uo7 = (struct UserObject*)obj4;
  uo7->data[2] = emptyclosure;
  Method *meth_meth_Oscillator_play7 = addmethod2pos(obj4, "play", &meth_Oscillator_play7, 2);
int argcv_meth_Oscillator_play7[] = {0};
meth_meth_Oscillator_play7->type = alloc_MethodType(1, argcv_meth_Oscillator_play7);
  meth_meth_Oscillator_play7->definitionModule = modulename;
  meth_meth_Oscillator_play7->definitionLine = 4;
  sourceObject = obj4;
// Begin line 2
  setline(2);
  setmodule(modulename);
  setsource(originalSourceLines);
// compilenode returning *var_wave_39_
  adddatum2(obj4, *var_wave_39_, 1);
  sourceObject = obj4;
objclass4 = obj4->class;
  objclass4->definitionModule = modulename;
  objclass4->definitionLine = 10;
  (*(struct UserObject *)self).data[0] = lowerouter4;
  self = oldself4;
  selfslot = oldselfslot4;
  stackframe = oldstackframe4;
  gc_frame_end(frame);
  return obj4;
}
Object meth_Oscillator_o13(Object self, int nparts, int *argcv, Object *args, int32_t flags) {
  struct UserObject *uo = (struct UserObject*)self;
  Object closure = getdatum((Object)uo, 2, (flags>>24)&0xff);
  struct StackFrameObject *stackframe = alloc_StackFrame(1, getclosureframe(closure));
  pushclosure(closure);
  pushstackframe(stackframe, "o");
  int frame = gc_frame_new();
  gc_frame_newslot((Object)stackframe);
  Object methodInheritingObject = NULL;
  Object params[1];
  int partcv[1];
  Object *var_o = getfromclosure(closure, 0);
  int i;
  int curarg = 0;
  int pushcv[] = {1};
  if (nparts < 1 && args)
    gracedie("missing argument list for o (probably reflection error): got %i lists, expected 1.", nparts);
if (argcv && argcv[0] > 0)
  gracedie("too many arguments for <Identifier[o]>");
  Object *selfslot = &(stackframe->slots[0]);
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  if (methodInheritingObject) curarg++;
// Begin line 9
  setline(9);
  setmodule(modulename);
  setsource(originalSourceLines);
// compilenode returning *var_o
  gc_frame_end(frame);
  return *var_o;
}
Object meth_Oscillator_o_58__61_14(Object self, int nparts, int *argcv, Object *args, int32_t flags) {
  struct UserObject *uo = (struct UserObject*)self;
  Object closure = getdatum((Object)uo, 3, (flags>>24)&0xff);
  struct StackFrameObject *stackframe = alloc_StackFrame(2, getclosureframe(closure));
  pushclosure(closure);
  pushstackframe(stackframe, "o:=");
  int frame = gc_frame_new();
  gc_frame_newslot((Object)stackframe);
  Object methodInheritingObject = NULL;
  if (nparts > 0 && argcv[0] < 1)
    gracedie("insufficient arguments to method");
  Object params[1];
  int partcv[1];
  Object *var_o = getfromclosure(closure, 0);
  int i;
  int curarg = 0;
  int pushcv[] = {1};
  if (nparts < 1 && args)
    gracedie("missing argument list for o:= (probably reflection error): got %i lists, expected 1.", nparts);
  Object *var__var_assign_tmp = &(stackframe->slots[0]);
  *var__var_assign_tmp = args[curarg];
  curarg++;
if (argcv && argcv[0] > 1)
  gracedie("too many arguments for <Identifier[o:=]>");
  Object *selfslot = &(stackframe->slots[1]);
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  if (methodInheritingObject) curarg++;
// compilenode returning *var__var_assign_tmp
  *var_o = *var__var_assign_tmp;
  if (*var__var_assign_tmp == undefined)
    callmethod(done, "assignment", 0, NULL, NULL);
// compilenode returning done
  gc_frame_end(frame);
  return done;
}
Object module_Oscillator_init() {
  int flags = 0;
  int frame = gc_frame_new();
  Object self = alloc_obj2(5, 5);
  self->class->definitionModule = modulename;
  gc_root(self);
  prelude = module_StandardPrelude_init();
  adddatum2(self, prelude, 0);
  addmethod2(self, "outer", &grace_userobj_outer);
  setline(1);
  setmodule(modulename);
  setsource(originalSourceLines);
  setclassname(self, "Module<Oscillator>");
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
  struct StackFrameObject *stackframe = alloc_StackFrame(5, NULL);
  gc_root((Object)stackframe);
  pushstackframe(stackframe, "module scope");
  Object *selfslot = &(stackframe->slots[0]);
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  Object params[1];
  int partcv[1];
  Object *var_Oscillator = &(stackframe->slots[1]);
  setframeelementname(stackframe, 1, "Oscillator");
  Object *var_o = &(stackframe->slots[2]);
  setframeelementname(stackframe, 2, "o");
// Begin line 10
  setline(10);
  setmodule(modulename);
  setsource(originalSourceLines);
  block_savedest(self);
  Object closure0 = createclosure(1, "Oscillator");
setclosureframe(closure0, stackframe);
  addtoclosure(closure0, var_Oscillator);
  struct UserObject *uo0 = (struct UserObject*)self;
  uo0->data[1] = (Object)closure0;
  Method *meth_meth_Oscillator_Oscillator0 = addmethod2pos(self, "Oscillator", &meth_Oscillator_Oscillator0, 1);
int argcv_meth_Oscillator_Oscillator0[] = {0};
meth_meth_Oscillator_Oscillator0->type = alloc_MethodType(1, argcv_meth_Oscillator_Oscillator0);
  meth_meth_Oscillator_Oscillator0->definitionModule = modulename;
  meth_meth_Oscillator_Oscillator0->definitionLine = 10;
// compilenode returning 
// Begin line 10
  setline(10);
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
  addmethodreal(obj1,"outer", &reader_Oscillator_outer_2);
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
  Method *meth_meth_Oscillator_wave3 = addmethod2pos(obj1, "wave", &meth_Oscillator_wave3, 1);
int argcv_meth_Oscillator_wave3[] = {1};
meth_meth_Oscillator_wave3->type = alloc_MethodType(1, argcv_meth_Oscillator_wave3);
  meth_meth_Oscillator_wave3->definitionModule = modulename;
  meth_meth_Oscillator_wave3->definitionLine = 10;
  Method *meth_meth_Oscillator_wave3_object = addmethod2pos(obj1, "wave()object", &meth_Oscillator_wave3_object, 1);
int argcv_meth_Oscillator_wave3_object[] = {1};
meth_meth_Oscillator_wave3_object->type = alloc_MethodType(1, argcv_meth_Oscillator_wave3_object);
  meth_meth_Oscillator_wave3_object->definitionModule = modulename;
  meth_meth_Oscillator_wave3_object->definitionLine = 10;
  sourceObject = obj1;
objclass1 = obj1->class;
  objclass1->definitionModule = modulename;
  objclass1->definitionLine = 10;
  (*(struct UserObject *)self).data[0] = lowerouter1;
  self = oldself1;
  selfslot = oldselfslot1;
  stackframe = oldstackframe1;
// compilenode returning obj1
  *var_Oscillator = obj1;
  if (obj1 == undefined)
    callmethod(done, "assignment", 0, NULL, NULL);
// compilenode returning done
// compilenode returning done
// Begin line 1
  setline(1);
  setmodule(modulename);
  setsource(originalSourceLines);
// compilenode returning 
// Begin line 9
  setline(9);
  setmodule(modulename);
  setsource(originalSourceLines);
  int callframe10 = gc_frame_new();
  if (strlit11 == NULL) {
    strlit11 = alloc_String("sine");
    gc_root(strlit11);
  }
// compilenode returning strlit11
  gc_frame_newslot(strlit11);
// compilenode returning *var_Oscillator
  params[0] = strlit11;
  partcv[0] = 1;
  Object call12 = callmethod(*var_Oscillator, "wave",
    1, partcv, params);
  gc_frame_end(callframe10);
// compilenode returning call12
  *var_o = call12;
  if (call12 == undefined)
    callmethod(done, "assignment", 0, NULL, NULL);
// Begin line 10
  setline(10);
  setmodule(modulename);
  setsource(originalSourceLines);
  block_savedest(self);
  Object closure13 = createclosure(1, "o");
setclosureframe(closure13, stackframe);
  addtoclosure(closure13, var_o);
  struct UserObject *uo13 = (struct UserObject*)self;
  uo13->data[2] = (Object)closure13;
  Method *meth_meth_Oscillator_o13 = addmethod2pos(self, "o", &meth_Oscillator_o13, 2);
int argcv_meth_Oscillator_o13[] = {0};
meth_meth_Oscillator_o13->type = alloc_MethodType(1, argcv_meth_Oscillator_o13);
  meth_meth_Oscillator_o13->definitionModule = modulename;
  meth_meth_Oscillator_o13->definitionLine = 10;
// compilenode returning 
// Begin line 10
  setline(10);
  setmodule(modulename);
  setsource(originalSourceLines);
  block_savedest(self);
  Object closure14 = createclosure(1, "o:=");
setclosureframe(closure14, stackframe);
  addtoclosure(closure14, var_o);
  struct UserObject *uo14 = (struct UserObject*)self;
  uo14->data[3] = (Object)closure14;
  Method *meth_meth_Oscillator_o_58__61_14 = addmethod2pos(self, "o:=", &meth_Oscillator_o_58__61_14, 3);
int argcv_meth_Oscillator_o_58__61_14[] = {1};
meth_meth_Oscillator_o_58__61_14->type = alloc_MethodType(1, argcv_meth_Oscillator_o_58__61_14);
  meth_meth_Oscillator_o_58__61_14->definitionModule = modulename;
  meth_meth_Oscillator_o_58__61_14->definitionLine = 10;
// compilenode returning 
// compilenode returning done
  int callframe16 = gc_frame_new();
// compilenode returning *var_o
  partcv[0] = 0;
  Object call17 = callmethod(*var_o, "play",
    1, partcv, params);
  gc_frame_end(callframe16);
// compilenode returning call17
  params[0] = call17;
  Object call18 = gracelib_print(NULL, 1,  params);
// compilenode returning call18
  gc_frame_end(frame);
  return self;
}
int main(int argc, char **argv) {
  initprofiling();
  setCompilerModulePath("/Users/samminns/git/minigrace");
  setModulePath("/usr/lib/grace/modules");
  gracelib_argv(argv);
  Object params[1];
  undefined = alloc_Undefined();
  done = alloc_done();
  Object tmp_argv = alloc_BuiltinList();
  gc_root(tmp_argv);
  int partcv_push[] = {1};
  int i; for (i=0; i<argc; i++) {
    params[0] = alloc_String(argv[i]);
    callmethod(tmp_argv, "push", 1, partcv_push, params);
  }
  module_sys_init_argv(tmp_argv);
  module_Oscillator_init();
  gracelib_stats();
  return 0;
}
